import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Field from "@/components/forms/Field";
import PressableScale from "@/components/ui/PressableScale";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { ApiPath } from "@/constants/api";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { ApiError, apiFetch } from "@/utils/api";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/validation/forgot-password";

const SUCCESS_TEXT =
  "Ak účet s touto e-mailovou adresou existuje, poslali sme naň odkaz na obnovenie hesla. Heslo si zmeníš na webe safecore.sk a potom sa vrátiš sem a prihlásiš sa.";

export default function ForgotPasswordScreen() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    mode: "onTouched",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: ForgotPasswordFormData) => {
    setSubmitError(null);
    try {
      await apiFetch(ApiPath.forgotPassword, {
        method: "POST",
        body: { email: email.toLowerCase() },
      });
      setSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError ? error.message : "Odoslanie sa nepodarilo.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title="Zabudnuté heslo" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {sent ? (
            <>
              <Text style={styles.successTitle}>Skontroluj si e-mail</Text>
              <Text style={styles.intro}>{SUCCESS_TEXT}</Text>
              <PressableScale
                style={styles.submitButton}
                onPress={() => router.back()}
                accessibilityRole="button"
                accessibilityLabel="Späť na prihlásenie"
              >
                <Text style={styles.submitText}>Späť na prihlásenie</Text>
              </PressableScale>
            </>
          ) : (
            <>
              <Text style={styles.intro}>
                Zadaj e-mail, ktorým sa prihlasuješ. Pošleme ti odkaz na
                obnovenie hesla.
              </Text>

              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Field
                    label="E-mail"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    placeholder="jan@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    textContentType="emailAddress"
                    returnKeyType="send"
                    onSubmitEditing={() => handleSubmit(onSubmit)()}
                  />
                )}
              />

              {submitError ? (
                <Text style={styles.submitError} accessibilityRole="alert">
                  {submitError}
                </Text>
              ) : null}

              <PressableScale
                style={styles.submitButton}
                onPress={() => handleSubmit(onSubmit)()}
                disabled={isSubmitting}
                accessibilityRole="button"
                accessibilityLabel="Odoslať odkaz na obnovenie"
              >
                {isSubmitting ? (
                  <ActivityIndicator color={Palette.onPrimary} />
                ) : (
                  <Text style={styles.submitText}>Odoslať odkaz</Text>
                )}
              </PressableScale>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { padding: 20, paddingBottom: 40 },
  intro: {
    fontFamily: Font.body,
    fontSize: 16,
    lineHeight: 23,
    color: Palette.textSecondary,
    marginBottom: 24,
  },
  successTitle: {
    fontFamily: Font.displayBold,
    fontSize: 24,
    color: Palette.text,
    marginBottom: 10,
  },
  submitError: {
    fontFamily: Font.body,
    fontSize: 15,
    color: Palette.danger,
    backgroundColor: Palette.dangerSoft,
    borderWidth: 1,
    borderColor: Palette.dangerBorder,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: Palette.primary,
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    color: Palette.onPrimary,
  },
});
