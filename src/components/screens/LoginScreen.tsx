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
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useSession } from "@/context/SessionContext";
import { ApiError } from "@/utils/api";
import { loginSchema, type LoginFormData } from "@/validation/login";

export default function LoginScreen() {
  const { signIn } = useSession();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email, password }: LoginFormData) => {
    setSubmitError(null);
    try {
      await signIn(email, password);
      router.replace("/home");
    } catch (error) {
      setSubmitError(
        error instanceof ApiError ? error.message : "Prihlásenie sa nepodarilo.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title="Prihlásenie" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.intro}>
            Prihlás sa e-mailom a heslom, ktoré používaš na safecore.sk.
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
                textContentType="username"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <Field
                label="Heslo"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="current-password"
                textContentType="password"
                returnKeyType="go"
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
            accessibilityLabel="Prihlásiť sa"
          >
            {isSubmitting ? (
              <ActivityIndicator color={Palette.onPrimary} />
            ) : (
              <Text style={styles.submitText}>Prihlásiť sa</Text>
            )}
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
  intro: {
    fontFamily: Font.body,
    fontSize: 16,
    lineHeight: 23,
    color: Palette.textSecondary,
    marginBottom: 24,
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
