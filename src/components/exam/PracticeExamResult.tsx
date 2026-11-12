import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { PracticeExam } from "@/types/practice-exam";
import type { QuizAnswers } from "@/types/quiz";
import { earnedPoints } from "@/utils/practice-exam";
import { countCorrect, optionLetter } from "@/utils/quiz";

type PracticeExamResultProps = {
  exam: PracticeExam;
  answers: QuizAnswers;
  timedOut: boolean;
  onRestart: () => void;
};

export default function PracticeExamResult({
  exam,
  answers,
  timedOut,
  onRestart,
}: PracticeExamResultProps) {
  const { questions, maxPoints, passPoints } = exam;
  const points = earnedPoints(questions, answers);
  const correct = countCorrect(questions, answers);
  const passed = points >= passPoints;
  // Nezodpovedané otázky (vypršal čas) sa počítajú ako nesprávne.
  const wrong = questions.filter((q) => answers[q.id] !== q.correct);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View
        style={[styles.summary, passed ? styles.summaryPassed : styles.summaryFailed]}
        accessible
        accessibilityLabel={`${points} z ${maxPoints} bodov, ${
          passed ? "test úspešný" : "test neúspešný"
        }`}
      >
        {timedOut ? <Text style={styles.timedOut}>Čas vypršal</Text> : null}
        <Text style={styles.score}>
          {points}/{maxPoints}
        </Text>
        <Text style={styles.points}>bodov</Text>
        <Text style={styles.verdict}>
          {passed ? "Test úspešný" : "Test neúspešný"} (min. {passPoints} bodov)
        </Text>
        <Text style={styles.detail}>
          Správne odpovede: {correct} z {questions.length}
        </Text>
      </View>

      {wrong.length > 0 ? (
        <View style={styles.wrongSection}>
          <Text style={styles.wrongTitle}>Nesprávne odpovede</Text>
          {wrong.map((q) => (
            <View key={q.id} style={styles.wrongCard}>
              <Text style={styles.wrongQuestion}>{q.text}</Text>
              <Text style={styles.wrongCorrect}>
                Správne: {optionLetter(q.correct)}) {q.options[q.correct]}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      <PressableScale
        style={styles.primaryButton}
        onPress={onRestart}
        accessibilityRole="button"
        accessibilityLabel="Nový cvičný test"
      >
        <Text style={styles.primaryText}>Nový cvičný test</Text>
      </PressableScale>
      <PressableScale
        style={styles.secondaryButton}
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Späť na zoznam testov"
      >
        <Text style={styles.secondaryText}>Späť na zoznam testov</Text>
      </PressableScale>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 40 },
  summary: {
    borderRadius: 22,
    borderWidth: 1,
    paddingVertical: 28,
    alignItems: "center",
    marginBottom: 20,
  },
  summaryPassed: {
    backgroundColor: Palette.successMuted,
    borderColor: Palette.successBorder,
  },
  summaryFailed: {
    backgroundColor: Palette.dangerSoft,
    borderColor: Palette.dangerBorder,
  },
  timedOut: {
    fontFamily: Font.bodySemiBold,
    fontSize: 16,
    color: Palette.danger,
    marginBottom: 6,
  },
  score: {
    fontFamily: Font.displayBold,
    fontSize: 56,
    lineHeight: 60,
    color: Palette.text,
  },
  points: { fontFamily: Font.bodySemiBold, fontSize: 20, color: Palette.text },
  verdict: {
    fontFamily: Font.body,
    fontSize: 15,
    color: Palette.textButtonSecondary,
    marginTop: 4,
  },
  detail: {
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.textSecondary,
    marginTop: 4,
  },
  wrongSection: { marginBottom: 12 },
  wrongTitle: {
    fontFamily: Font.displayBold,
    fontSize: 20,
    color: Palette.text,
    marginBottom: 10,
  },
  wrongCard: {
    backgroundColor: Palette.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  wrongQuestion: {
    fontFamily: Font.body,
    fontSize: 15,
    lineHeight: 21,
    color: Palette.text,
    marginBottom: 6,
  },
  wrongCorrect: {
    fontFamily: Font.bodySemiBold,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.primary,
  },
  primaryButton: {
    backgroundColor: Palette.primary,
    borderRadius: 14,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  primaryText: { fontFamily: Font.bodySemiBold, fontSize: 17, color: Palette.onPrimary },
  secondaryButton: {
    backgroundColor: Palette.surface,
    borderRadius: 14,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  secondaryText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    color: Palette.textButtonSecondary,
  },
});
