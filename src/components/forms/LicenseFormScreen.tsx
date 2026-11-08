import DateField from "@/components/forms/DateField";
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
import { createLicenseSchema } from "@/validation/license";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useMemo } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FieldProps = TextInputProps & {
  label: string;
  error?: string;
  prefix?: string;
};

function Field({ label, error, prefix, ...inputProps }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
        <TextInput
          {...inputProps}
          style={styles.inputText}
          placeholderTextColor={Palette.icon}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export default function LicenseFormScreen({
  config,
}: {
  config: LicenseFormConfig;
}) {
  const schema = useMemo(() => createLicenseSchema(config), [config]);

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
    },
  });

  const onSubmit = (data: LicenseFormData) => {
    // TODO: odoslať na API / uložiť lokálne
    console.log(config.title, data);
    router.back();
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

          <PressableScale
            style={styles.saveButton}
            onPress={() => handleSubmit(onSubmit)()}
          >
            <Text style={styles.saveText}>Uložiť</Text>
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
  field: { marginBottom: 18 },
  label: {
    fontFamily: Font.bodySemiBold,
    fontSize: 15,
    color: Palette.textButtonSecondary,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Palette.surface,
    borderWidth: 1.5,
    borderColor: "transparent",
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  prefix: { fontFamily: Font.body, fontSize: 17, color: Palette.textSecondary, marginRight: 2 },
  inputText: {
    flex: 1,
    paddingVertical: 15,
    fontFamily: Font.body,
    fontSize: 17,
    color: Palette.text,
  },
  inputError: { borderColor: Palette.danger },
  errorText: { marginTop: 6, fontFamily: Font.body, fontSize: 14, color: Palette.danger },
  saveButton: {
    marginTop: 8,
    backgroundColor: Palette.primary,
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: { fontFamily: Font.bodySemiBold, fontSize: 17, color: Palette.onPrimary },
});
