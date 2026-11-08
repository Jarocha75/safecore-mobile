import CustomHeader from "@/components/CustomHeader";
import PressableScale from "@/components/ui/PressableScale";
import { Font } from "@/constants/typography";
import { Palette } from "@/constants/palette";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { LicenseCardItem } from "@/types/license";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LICENSES: LicenseCardItem[] = [
  {
    id: "zbrojny-preukaz",
    title: "Zbrojný preukaz",
    href: "/firearm-license",
    icon: (
      <MaterialCommunityIcons
        name="pistol"
        size={24}
        color={Palette.primary}
      />
    ),
  },
  {
    id: "preukaz-sbs",
    title: "Preukaz SBS",
    href: "/sbs-license",
    icon: <Ionicons name="id-card" size={24} color={Palette.primary} />,
  },
];

export default function LicenseScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader
        title="Preukaz"
        onNotificationPress={() => console.log("Notifikácie")}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          Tu si môžeš overiť platnosť svojho preukazu a nastaviť upozornenie,
          aby ti neskončila bez povšimnutia. Vyber si typ preukazu.
        </Text>

        {LICENSES.map((license) => (
          <PressableScale
            key={license.id}
            style={styles.card}
            onPress={() => router.push(license.href)}
            accessibilityRole="button"
            accessibilityLabel={license.title}
          >
            <View style={styles.iconBox}>{license.icon}</View>
            <Text style={styles.cardTitle}>{license.title}</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Palette.icon}
              style={styles.chevron}
            />
          </PressableScale>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  description: {
    fontFamily: Font.body,
    fontSize: 16,
    color: Palette.textSecondary,
    lineHeight: 23,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Palette.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Palette.surfaceRaised,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    flex: 1,
    fontFamily: Font.bodySemiBold,
    fontSize: 18,
    color: Palette.text,
  },
  chevron: {
    marginLeft: "auto",
  },
});
