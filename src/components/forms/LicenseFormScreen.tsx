import DateField from "@/components/forms/DateField";
import Field from "@/components/forms/Field";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import PressableScale from "@/components/ui/PressableScale";
import { Font } from "@/constants/typography";
import { Palette } from "@/constants/palette";
import type {
  LicenseFormConfig,
  LicenseFormData,
  LicenseFormValues,
} from "@/types/license";
import { formatPhone } from "@/utils/phone";
import ReminderStatusCard from "@/components/license/ReminderStatusCard";
import { useLicenseReminders } from "@/hooks/useLicenseReminders";
import ConsentCheckbox from "@/components/forms/ConsentCheckbox";
import { PRIVACY_POLICY_URL } from "@/constants/links";
import { useSession } from "@/context/SessionContext";
import { ApiError } from "@/utils/api";
import { saveLicenseReminder, toDateOnly } from "@/utils/license-reminders";
import { loadStoredLicense, saveStoredLicense } from "@/utils/license-storage";
import { parseIsoDate } from "@/utils/date";
import { createLicenseSchema } from "@/validation/license";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LicenseFormScreen({
  config,
}: {
  config: LicenseFormConfig;
}) {
  const { session } = useSession();
  const { find, remove, removing, removeError } = useLicenseReminders();
  const existing = find(config.kind);
  const schema = useMemo(() => createLicenseSchema(config), [config]);
  // Platnosť preukazu: od dnešného dňa najviac 20 rokov dopredu.
  const { minDate, maxDate } = useMemo(() => {
    const min = new Date();
    min.setHours(0, 0, 0, 0);
    const max = new Date(min);
    max.setFullYear(max.getFullYear() + 20);
    return { minDate: min, maxDate: max };
  }, []);

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm<LicenseFormValues, unknown, LicenseFormData>({
    // Schéma odmietne null v validUntil, preto je výstupný typ LicenseFormData.
    // Chyba sa ukáže hneď po opustení poľa, potom sa kontroluje pri písaní.
    mode: "onTouched",
    resolver: zodResolver(schema) as Resolver<
      LicenseFormValues,
      unknown,
      LicenseFormData
    >,
    defaultValues: {
      firstName: "",
      lastName: "",
      licenseNumber: "",
      validUntil: null,
      phone: "",
      smsConsent: false,
    },
  });

  // Pri úprave predvyplníme údaje uložené v telefóne (telefón a súhlas sa zadávajú znova).
  useEffect(() => {
    let cancelled = false;
    void loadStoredLicense(config.kind).then((saved) => {
      if (cancelled || !saved || isDirty) return;
      const validUntil = parseIsoDate(saved.validUntil);
      reset({
        ...getValues(),
        firstName: saved.firstName,
        lastName: saved.lastName,
        licenseNumber: saved.licenseNumber,
        // Vypršaný dátum minimálny dátum odmietne, pri obnove sa zadáva nový.
        validUntil: validUntil >= minDate ? validUntil : null,
      });
    });
    return () => {
      cancelled = true;
    };
    // Načítanie len raz pri otvorení formulára.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: LicenseFormData) => {
    if (!session) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      // Osobné údaje nelogovať.
      await saveLicenseReminder(config.kind, data, session.token);
      // Meno a číslo preukazu zostávajú len v telefóne (server ich nedostane).
      await saveStoredLicense(config.kind, {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        licenseNumber: data.licenseNumber.trim(),
        validUntil: toDateOnly(data.validUntil),
      });
      Alert.alert(
        "Uložené",
        "SMS upozornenie ti príde 3 mesiace a týždeň pred koncom platnosti.",
        [{ text: "OK", onPress: () => router.back() }],
      );
    } catch (e) {
      setSubmitError(
        e instanceof ApiError ? e.message : "Niečo sa pokazilo. Skús to znova.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title={config.title} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {existing ? (
            <ReminderStatusCard
              reminder={existing}
              removing={removing}
              error={removeError}
              onRemove={() => void remove(config.kind)}
            />
          ) : null}
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange, onBlur } }) => (
              <Field
                label="Meno"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.firstName?.message}
                placeholder="Ján"
                autoCapitalize="words"
                autoComplete="given-name"
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange, onBlur } }) => (
              <Field
                label="Priezvisko"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.lastName?.message}
                placeholder="Novák"
                autoCapitalize="words"
                autoComplete="family-name"
              />
            )}
          />
          <Controller
            control={control}
            name="licenseNumber"
            render={({ field: { value, onChange, onBlur } }) => (
              <Field
                label={config.numberLabel}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.licenseNumber?.message}
                placeholder={config.numberPlaceholder}
                autoCapitalize="characters"
              />
            )}
          />
          <Controller
            control={control}
            name="validUntil"
            render={({ field: { value, onChange } }) => (
              <DateField
                label="Dátum platnosti do"
                value={value}
                onChange={onChange}
                minimumDate={minDate}
                maximumDate={maxDate}
                error={errors.validUntil?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onChange, onBlur } }) => (
              <Field
                label="Telefónne číslo"
                value={value}
                onChangeText={(text) => onChange(formatPhone(text))}
                onBlur={onBlur}
                error={errors.phone?.message}
                prefix="+"
                placeholder="421 900 000 000"
                keyboardType="number-pad"
                autoComplete="off"
                textContentType="none"
                importantForAutofill="no"
                maxLength={19}
              />
            )}
          />

          <Controller
            control={control}
            name="smsConsent"
            render={({ field: { value, onChange } }) => (
              <ConsentCheckbox
                value={value}
                onChange={onChange}
                label="Súhlasím so zasielaním SMS upozornení na uvedené telefónne číslo 3 mesiace a týždeň pred koncom platnosti preukazu. Súhlas môžem kedykoľvek odvolať v aplikácii (Zrušiť upozornenie) alebo e-mailom."
                linkLabel="Zásady ochrany osobných údajov"
                onLinkPress={() => void openBrowserAsync(PRIVACY_POLICY_URL)}
                error={errors.smsConsent?.message}
              />
            )}
          />

          {submitError ? <Text style={styles.errorText}>{submitError}</Text> : null}

          <PressableScale
            style={[styles.saveButton, submitting && styles.saveButtonDisabled]}
            onPress={() => {
              if (!submitting) void handleSubmit(onSubmit)();
            }}
            accessibilityRole="button"
            accessibilityLabel="Uložiť"
            accessibilityState={{ disabled: submitting }}
          >
            <Text style={styles.saveText}>
              {submitting ? "Ukladám…" : "Uložiť"}
            </Text>
          </PressableScale>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { padding: 20, paddingBottom: 40 },
  saveButton: {
    marginTop: 8,
    backgroundColor: Palette.primary,
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonDisabled: { opacity: 0.6 },
  errorText: {
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.danger,
    marginBottom: 8,
  },
  saveText: { fontFamily: Font.bodySemiBold, fontSize: 17, color: Palette.onPrimary },
});
