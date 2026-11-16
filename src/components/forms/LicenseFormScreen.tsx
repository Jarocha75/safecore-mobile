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
import ConsentCheckbox from "@/components/forms/ConsentCheckbox";
import { useSession } from "@/context/SessionContext";
import { ApiError } from "@/utils/api";
import { saveLicenseReminder } from "@/utils/license-reminders";
import { createLicenseSchema } from "@/validation/license";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useMemo, useState } from "react";
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
    formState: { errors },
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

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: LicenseFormData) => {
    if (!session) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      // Osobné údaje nelogovať.
      await saveLicenseReminder(config.kind, data, session.token);
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
                label="Súhlasím so zasielaním SMS upozornení na uvedené telefónne číslo 3 mesiace a týždeň pred koncom platnosti preukazu. Súhlas môžem kedykoľvek odvolať."
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
