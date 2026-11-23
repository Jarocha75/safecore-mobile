import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { openBrowserAsync } from "expo-web-browser";
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PressableScale from "@/components/ui/PressableScale";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { ABOUT_LINKS, APP_VERSION, COMPANY_NAME } from "@/constants/about";
import { CardStyles } from "@/constants/card-styles";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { AboutLink } from "@/types/profile";

async function openLink(link: AboutLink) {
  try {
    if (link.external) await openBrowserAsync(link.url);
    else await Linking.openURL(link.url);
  } catch {
    Alert.alert("Odkaz sa nepodarilo otvoriť", link.subtitle ?? link.title);
  }
}

/** O SafeCore: názov firmy, verzia appky, kontakty a odkazy na web. */
export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title="O SafeCore" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          {/* Logo už obsahuje názov firmy, preto bez samostatného textu. */}
          <Image
            source={require("@/assets/logo/logo-dark-removebg-preview.png")}
            style={styles.logo}
            contentFit="contain"
            accessibilityLabel="SafeCore logo"
          />
          {APP_VERSION ? (
            <Text style={styles.version}>Verzia {APP_VERSION}</Text>
          ) : null}
          <Text style={styles.description}>
            Príprava na skúšky na zbrojný preukaz a pre bezpečnostné služby.
            Testy, legislatíva a tlačivá na jednom mieste.
          </Text>
        </View>

        {ABOUT_LINKS.map((link) => (
          <PressableScale
            key={link.id}
            style={CardStyles.listCard}
            onPress={() => void openLink(link)}
            accessibilityRole="link"
            accessibilityLabel={link.subtitle ? `${link.title}, ${link.subtitle}` : link.title}
          >
            <View style={CardStyles.iconBox}>
              <Ionicons name={link.icon} size={24} color={Palette.primary} />
            </View>
            <View style={styles.linkText}>
              <Text style={styles.title}>{link.title}</Text>
              {link.subtitle ? (
                <Text style={styles.subtitle}>{link.subtitle}</Text>
              ) : null}
            </View>
            {link.external ? (
              <Ionicons name="open-outline" size={18} color={Palette.icon} />
            ) : null}
          </PressableScale>
        ))}

        <Text style={styles.footer}>© {new Date().getFullYear()} {COMPANY_NAME}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  hero: { alignItems: "center", marginBottom: 24 },
  logo: { width: 200, height: 200, marginTop: -16, marginBottom: -24 },
  version: {
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  description: {
    fontFamily: Font.body,
    fontSize: 15,
    color: Palette.textSecondary,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 12,
  },
  linkText: { flex: 1 },
  title: { fontFamily: Font.bodySemiBold, fontSize: 18, color: Palette.text },
  subtitle: {
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  footer: {
    fontFamily: Font.body,
    fontSize: 13,
    color: Palette.textSecondary,
    textAlign: "center",
    marginTop: 24,
  },
});
