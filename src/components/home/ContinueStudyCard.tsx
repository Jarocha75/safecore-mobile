import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Palette } from "@/constants/palette";
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
  const percent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Pokračuj v štúdiu. ${courseTitle}, ${testTitle}, otázka ${questionNumber} z ${totalQuestions}`}
    >
      <Text style={styles.eyebrow}>POKRAČUJ V ŠTÚDIU</Text>
      <Text style={styles.course}>{courseTitle}</Text>
      <Text style={styles.test}>{testTitle}</Text>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.progressText}>
        Otázka {questionNumber} z {totalQuestions} · {percent} %
      </Text>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Pokračovať</Text>
        <Ionicons name="arrow-forward" size={18} color={Palette.text} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.primaryMuted,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Palette.primaryBorder,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: Palette.primary,
    marginBottom: 8,
  },
  course: {
    fontSize: 22,
    fontWeight: "bold",
    color: Palette.text,
    marginBottom: 4,
  },
  test: {
    fontSize: 14,
    color: Palette.textButtonSecondary,
    marginBottom: 16,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.border,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: Palette.primary,
  },
  progressText: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Palette.primary,
    borderRadius: 12,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Palette.text,
  },
});
