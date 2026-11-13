import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { LegalNorm } from "@/types/legislation";

type LegalNormCardProps = {
  norm: LegalNorm;
  /** PDF je stiahnuté v zariadení (otvorí sa aj offline). */
  downloaded?: boolean;
  onPress: () => void;
};

/** Karta predpisu: vľavo rok vydania, vpravo názov, popis a odkaz na PDF. */
export default function LegalNormCard({ norm, downloaded = false, onPress }: LegalNormCardProps) {
  const available = norm.pdf !== null;

  return (
    <PressableScale
      style={styles.card}
      onPress={available ? onPress : undefined}
      accessibilityRole={available ? "link" : "text"}
      accessibilityLabel={`${norm.title}. ${norm.subtitle}`}
      accessibilityHint={available ? "Otvorí PDF predpisu" : undefined}
    >
      <View style={styles.year}>
        <Text style={styles.yearText}>{norm.year}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{norm.title}</Text>
        <Text style={styles.subtitle}>{norm.subtitle}</Text>
        <Text style={styles.description}>{norm.description}</Text>
        <View style={styles.action}>
          <Ionicons
            name="document-text-outline"
            size={16}
            color={available ? Palette.primary : Palette.textSecondary}
          />
          <Text style={[styles.actionText, !available && styles.actionMuted]}>
            {!available
              ? "PDF čoskoro"
              : downloaded
                ? "Otvoriť PDF (stiahnuté)"
                : "Otvoriť PDF"}
          </Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: Palette.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    gap: 14,
  },
  year: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: Palette.surfaceRaised,
    alignItems: "center",
    justifyContent: "center",
  },
  yearText: {
    fontFamily: Font.displayBold,
    fontSize: 15,
    color: Palette.textButtonSecondary,
  },
  body: { flex: 1 },
  title: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    color: Palette.text,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: Font.bodyMedium,
    fontSize: 14,
    lineHeight: 19,
    color: Palette.primary,
    marginBottom: 6,
  },
  description: {
    fontFamily: Font.body,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.textSecondary,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  actionText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 14,
    color: Palette.primary,
  },
  actionMuted: { color: Palette.textSecondary },
});
