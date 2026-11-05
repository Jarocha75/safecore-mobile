import CustomHeader from "@/components/CustomHeader";
import { Palette } from "@/constants/palette";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Vlastný header */}
      <CustomHeader
        title="Testy"
        onNotificationPress={() => console.log("Notifikácie")}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Úvodný text / popis */}
        <Text style={styles.sectionDescription}>
          Vyber si kategóriu preukazu, na ktorú sa chceš pripraviť. Každý modul
          obsahuje legislatívu a cvičné testy.
        </Text>

        {/* Karta 1: Zbrojný preukaz */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => console.log("Klik na Zbrojný preukaz")}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, styles.iconContainerPrimary]}>
              <Ionicons
                name="shield-checkmark"
                size={24}
                color={Palette.primary}
              />
            </View>
            <View style={styles.badgeActive}>
              <Text style={styles.badgeActiveText}>Dostupné</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>Zbrojný preukaz</Text>
          <Text style={styles.cardDescription}>
            Skupiny A, B, C, D, E – Kompletná legislatíva, zákony o zbraniach a
            strelive, a cvičné testové otázky.
          </Text>

          <View style={styles.cardFooter}>
            <Text style={styles.footerLinkText}>Začať prípravu</Text>
            <Ionicons name="arrow-forward" size={16} color={Palette.primary} />
          </View>
        </TouchableOpacity>

        {/* Karta 2: Preukaz SBS */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => console.log("Klik na Preukaz SBS")}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, styles.iconContainerSuccess]}>
              <Ionicons name="id-card" size={24} color={Palette.success} />
            </View>
            <View style={styles.badgePro}>
              <Text style={styles.badgeProText}>Typ S a P</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>Preukaz SBS (S & P)</Text>
          <Text style={styles.cardDescription}>
            Odborná príprava pre strážnu službu (Typ S) a detektívnu službu /
            zbraňovú stráž (Typ P).
          </Text>

          <View style={styles.cardFooter}>
            <Text style={[styles.footerLinkText, styles.footerLinkSuccess]}>
              Začať prípravu
            </Text>
            <Ionicons name="arrow-forward" size={16} color={Palette.success} />
          </View>
        </TouchableOpacity>
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
  sectionDescription: {
    fontSize: 14,
    color: Palette.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  iconContainerPrimary: {
    backgroundColor: Palette.primaryMuted,
    borderColor: Palette.primaryBorder,
  },
  iconContainerSuccess: {
    backgroundColor: Palette.successMuted,
    borderColor: Palette.successBorder,
  },
  badgeActive: {
    backgroundColor: Palette.primaryMuted,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Palette.primaryBorder,
  },
  badgeActiveText: {
    fontSize: 12,
    fontWeight: "600",
    color: Palette.primary,
  },
  badgePro: {
    backgroundColor: Palette.successMuted,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Palette.successBorder,
  },
  badgeProText: {
    fontSize: 12,
    fontWeight: "600",
    color: Palette.success,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Palette.text,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: Palette.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: Palette.border,
    paddingTop: 14,
  },
  footerLinkText: {
    fontSize: 14,
    fontWeight: "600",
    color: Palette.primary,
  },
  footerLinkSuccess: {
    color: Palette.success,
  },
});
