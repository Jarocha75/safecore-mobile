import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Priehľadné logo – nemá vlastný podklad, ktorý by presvital */}
        <Image
          source={require("@/assets/logo/logo-dark-removebg-preview.png")}
          style={styles.logo}
          contentFit="contain"
          accessibilityLabel="SafeCore logo"
        />

        <Text style={styles.title}>Skúška na preukaz bez stresu</Text>
        <Text style={styles.subtitle}>
          Príprava na zbrojný preukaz a odbornú spôsobilosť SBS. Testy, osnova a
          zákony vždy po ruke.
        </Text>
      </View>

      <View style={styles.footer}>
        <PressableScale
          style={styles.primaryButton}
          accessibilityRole="button"
          onPress={() => router.push("/login")}
        >
          <Text style={styles.primaryButtonText}>Prihlásiť sa</Text>
        </PressableScale>
        <Text style={styles.hint}>
          Prístup majú študenti so zakúpeným kurzom.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    aspectRatio: 1,
    maxHeight: 320,
    marginBottom: 12,
  },
  title: {
    fontFamily: Font.displayBold,
    fontSize: 36,
    lineHeight: 40,
    color: Palette.text,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: Font.body,
    fontSize: 17,
    lineHeight: 25,
    color: Palette.textSecondary,
    maxWidth: 340,
  },
  footer: {
    gap: 10,
    paddingBottom: 16,
  },
  primaryButton: {
    backgroundColor: Palette.primary,
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    color: Palette.onPrimary,
  },
  hint: {
    fontFamily: Font.body,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.textSecondary,
    textAlign: "center",
  },
});
