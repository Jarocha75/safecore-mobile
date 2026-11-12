import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";

const TITLE = "Cvičný test";
/** Rozsah cvičného testu podľa typu kurzu (musí sedieť so serverom, `lib/cvicnyTestConstants.ts` na webe). */
const META: Record<"S" | "P", string> = {
  S: "40 otázok · 40 minút",
  P: "50 otázok · 50 minút",
};
const HINT = "Nanečisto ako na skúške: každý pokus má nové otázky a bodovanie.";

/** Hlavná karta cvičného testu kurzu S – oddelená od zoznamu tém. */
type PracticeExamCardProps = { courseId: string; type: "S" | "P" };

export default function PracticeExamCard({ courseId, type }: PracticeExamCardProps) {
  return (
    <PressableScale
      style={styles.card}
      onPress={() =>
        router.push({ pathname: "/practice-exam/[courseId]", params: { courseId } })
      }
      accessibilityRole="button"
      accessibilityLabel={`${TITLE}, ${META[type]}`}
    >
      <View style={styles.topRow}>
        <View style={styles.texts}>
          <Text style={styles.title}>{TITLE}</Text>
          <Text style={styles.meta}>{META[type]}</Text>
        </View>
        <View style={styles.play}>
          <Ionicons name="timer" size={24} color={Palette.onPrimary} />
        </View>
      </View>
      <Text style={styles.hint}>{HINT}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surfaceRaised,
    borderRadius: 22,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Palette.primaryBorder,
  },
  topRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  texts: { flex: 1 },
  title: {
    fontFamily: Font.displayBold,
    fontSize: 26,
    lineHeight: 28,
    color: Palette.text,
    marginBottom: 4,
  },
  meta: {
    fontFamily: Font.bodySemiBold,
    fontSize: 15,
    color: Palette.primary,
  },
  play: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Palette.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  hint: {
    fontFamily: Font.body,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.textSecondary,
    marginTop: 14,
  },
});
