import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { StudyProgress } from "@/types/study";

type ContinueStudyCardProps = {
  progress: StudyProgress;
  onPress?: () => void;
};

export default function ContinueStudyCard({
  progress,
  onPress,
}: ContinueStudyCardProps) {
  const { courseTitle, testTitle, questionNumber, totalQuestions } = progress;
  const percent =
    totalQuestions > 0
      ? Math.min(100, Math.round((questionNumber / totalQuestions) * 100))
      : 0;

  return (
    <PressableScale
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Pokračuj v štúdiu. ${courseTitle}, ${testTitle}, otázka ${questionNumber} z ${totalQuestions}`}
    >
      <View style={styles.topRow}>
        <View style={styles.texts}>
          <Text style={styles.course}>{courseTitle}</Text>
          <Text style={styles.test}>{testTitle}</Text>
        </View>
        <View style={styles.play}>
          <Ionicons name="play" size={20} color={Palette.onPrimary} />
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percent}%` }]} />
      </View>
      <View style={styles.progressRow}>
        <Text style={styles.progressText}>
          Otázka {questionNumber} z {totalQuestions}
        </Text>
        <Text style={styles.percent}>{percent} %</Text>
      </View>
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  texts: { flex: 1 },
  course: {
    fontFamily: Font.displayBold,
    fontSize: 26,
    lineHeight: 28,
    color: Palette.text,
    marginBottom: 4,
  },
  test: {
    fontFamily: Font.body,
    fontSize: 15,
    lineHeight: 20,
    color: Palette.textButtonSecondary,
  },
  play: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Palette.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 3,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.background,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: Palette.primary,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  progressText: {
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.textSecondary,
  },
  percent: {
    fontFamily: Font.displayBold,
    fontSize: 16,
    color: Palette.primary,
  },
});
