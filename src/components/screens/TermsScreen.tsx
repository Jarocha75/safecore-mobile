import { Ionicons } from "@expo/vector-icons";
import { openBrowserAsync } from "expo-web-browser";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PressableScale from "@/components/ui/PressableScale";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { CardStyles } from "@/constants/card-styles";
import { LEGAL_LINKS } from "@/constants/links";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";

/** Podmienky používania: odkazy na obchodné podmienky a ochranu osobných údajov na webe. */
export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title="Podmienky používania" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          Dokumenty sa otvoria na webe SafeCore.
        </Text>

        {LEGAL_LINKS.map((link) => (
          <PressableScale
            key={link.id}
            style={CardStyles.listCard}
            onPress={() => void openBrowserAsync(link.url)}
            accessibilityRole="link"
            accessibilityLabel={link.title}
          >
            <View style={CardStyles.iconBox}>
              <Ionicons name={link.icon} size={24} color={Palette.primary} />
            </View>
            <Text style={styles.title}>{link.title}</Text>
            <Ionicons name="open-outline" size={18} color={Palette.icon} />
          </PressableScale>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  description: {
    fontFamily: Font.body,
    fontSize: 15,
    color: Palette.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  title: {
    flex: 1,
    fontFamily: Font.bodySemiBold,
    fontSize: 18,
    color: Palette.text,
  },
});
