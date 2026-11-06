import CustomHeader from "@/components/CustomHeader";
import { Palette } from "@/constants/palette";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { LicenseCardItem } from "@/types/license";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.description}>
          Tu si môžeš overiť platnosť svojho preukazu a nastaviť upozornenie,
          aby ti neskončila bez povšimnutia. Vyber si typ preukazu.
        </Text>

        {LICENSES.map((license) => (
          <TouchableOpacity
            key={license.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push(license.href)}
          >
            {license.icon}
            <Text style={styles.cardTitle}>{license.title}</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Palette.icon}
              style={styles.chevron}
            />
          </TouchableOpacity>
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
    padding: 20,
    paddingBottom: 40,
  },
  description: {
    fontSize: 14,
    color: Palette.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: Palette.text,
  },
  chevron: {
    marginLeft: "auto",
  },
});
