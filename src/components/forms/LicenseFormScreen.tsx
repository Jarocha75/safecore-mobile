import DateField from "@/components/forms/DateField";
import { Palette } from "@/constants/palette";
import type {
  LicenseFormConfig,
  LicenseFormErrors,
  LicenseFormValues,
} from "@/types/license";
import { formatPhone, isValidPhone } from "@/utils/phone";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function validate(
  values: LicenseFormValues,
  config: LicenseFormConfig,
): LicenseFormErrors {
  const errors: LicenseFormErrors = {};
  if (!values.firstName.trim()) errors.firstName = "Zadaj meno.";
  if (!values.lastName.trim()) errors.lastName = "Zadaj priezvisko.";
  if (!values.licenseNumber.trim())
    errors.licenseNumber = config.numberRequiredMessage;
  if (!values.validUntil) errors.validUntil = "Vyber dátum platnosti.";
  if (!isValidPhone(values.phone))
    errors.phone = "Zadaj platné telefónne číslo.";
  return errors;
}

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
  const [values, setValues] = useState<LicenseFormValues>({
    firstName: "",
    lastName: "",
    licenseNumber: "",
    validUntil: null,
    phone: "",
  });
  const [errors, setErrors] = useState<LicenseFormErrors>({});

  const setField =
    <K extends keyof LicenseFormValues>(key: K) =>
    (value: LicenseFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSave = () => {
    const found = validate(values, config);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // TODO: odoslať na API / uložiť lokálne
    console.log(config.title, values);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
          accessibilityLabel="Späť"
        >
          <Ionicons name="chevron-back" size={22} color={Palette.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>{config.title}</Text>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Field
            label="Meno"
            value={values.firstName}
            onChangeText={setField("firstName")}
            error={errors.firstName}
            placeholder="Ján"
            autoCapitalize="words"
            autoComplete="given-name"
          />
          <Field
            label="Priezvisko"
            value={values.lastName}
            onChangeText={setField("lastName")}
            error={errors.lastName}
            placeholder="Novák"
            autoCapitalize="words"
            autoComplete="family-name"
          />
          <Field
            label={config.numberLabel}
            value={values.licenseNumber}
            onChangeText={setField("licenseNumber")}
            error={errors.licenseNumber}
            placeholder={config.numberPlaceholder}
            autoCapitalize="characters"
          />
          <DateField
            label="Dátum platnosti do"
            value={values.validUntil}
            onChange={setField("validUntil")}
            error={errors.validUntil}
          />
          <Field
            label="Telefónne číslo"
            value={values.phone}
            onChangeText={(text) => setField("phone")(formatPhone(text))}
            error={errors.phone}
            prefix="+"
            placeholder="421 900 000 000"
            keyboardType="number-pad"
            autoComplete="off"
            textContentType="none"
            importantForAutofill="no"
            maxLength={19}
          />

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={handleSave}
          >
            <Text style={styles.saveText}>Uložiť</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: Palette.background },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  topTitle: { fontSize: 18, fontWeight: "bold", color: Palette.text },
  scrollContent: { padding: 20, paddingBottom: 40 },
  field: { marginBottom: 18 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Palette.textButtonSecondary,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  prefix: { fontSize: 16, color: Palette.textSecondary, marginRight: 2 },
  inputText: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: Palette.text,
  },
  inputError: { borderColor: Palette.danger },
  errorText: { marginTop: 6, fontSize: 13, color: Palette.danger },
  saveButton: {
    marginTop: 8,
    backgroundColor: Palette.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveText: { fontSize: 16, fontWeight: "bold", color: Palette.text },
});
