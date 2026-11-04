import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Palette } from "@/constants/palette";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require("../../../assets/logo/logo-dark.png")}
          style={styles.logo}
          contentFit="contain"
          accessibilityLabel="SafeCore logo"
        />

        {/* Nadpis a podnadpis */}
        <Text style={styles.title}>SafeCore Mobile</Text>
        <Text style={styles.subtitle}>
          Profesionálna príprava na zbrojný preukaz a odbornú spôsobilosť SBS na
          jednom mieste.
        </Text>
      </View>

      {/* Tlačidlá dole */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          accessibilityRole="button"
          onPress={() => router.replace("/home")} // TODO: registrácia
        >
          <Text style={styles.primaryButtonText}>Začať / Registrácia</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          accessibilityRole="button"
          onPress={() => router.replace("/home")} // TODO: prihlásenie
        >
          <Text style={styles.secondaryButtonText}>
            Už mám účet (Prihlásiť sa)
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    justifyContent: "space-between",
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: Palette.logoRing,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Palette.text,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Palette.textSecondary,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  footer: {
    width: "100%",
    gap: 12,
    paddingBottom: 20,
  },
  primaryButton: {
    backgroundColor: Palette.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: Palette.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryButtonText: {
    color: Palette.text,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Palette.border,
  },
  secondaryButtonText: {
    color: Palette.textButtonSecondary,
    fontSize: 16,
    fontWeight: "500",
  },
});
