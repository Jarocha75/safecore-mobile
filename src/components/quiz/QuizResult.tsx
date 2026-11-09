import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { ApiPath } from "@/constants/api";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useSession } from "@/context/SessionContext";
import type { QuizAnswers, QuizTest, SubmitResultResponse } from "@/types/quiz";
import { ApiError, apiFetch } from "@/utils/api";
import { countCorrect, optionLetter } from "@/utils/quiz";

type QuizResultProps = {
  test: QuizTest;
  /** Otázky v poradí, v akom boli zobrazené. */
  questions: QuizTest["questions"];
  answers: QuizAnswers;
  onRestart: () => void;
};

type SaveStatus = "saving" | "saved" | "error";

export default function QuizResult({
  test,
  questions,
  answers,
  onRestart,
}: QuizResultProps) {
  const { session } = useSession();
  const [status, setStatus] = useState<SaveStatus>("saving");
  const [saved, setSaved] = useState<SubmitResultResponse | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const startedRef = useRef(false);

  const send = async () => {
    try {
      const response = await apiFetch<SubmitResultResponse>(
        ApiPath.testResults(test.id),
        {
          method: "POST",
          token: session?.token,
          body: {
            answers: questions
              .filter((q) => answers[q.id] !== undefined)
              .map((q) => ({ questionId: q.id, answerIndex: answers[q.id] })),
          },
        },
      );
      setSaved(response);
      setStatus("saved");
    } catch (error) {
      setSaveError(
        error instanceof ApiError ? error.message : "Výsledok sa nepodarilo uložiť.",
      );
      setStatus("error");
    }
  };

  useEffect(() => {
    // Ochrana pred dvojitým odoslaním (React StrictMode v dev režime spúšťa efekt dvakrát).
    if (startedRef.current) return;
    startedRef.current = true;
    void send();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrySave = () => {
    setStatus("saving");
    setSaveError(null);
    void send();
  };

  const correctCount = saved?.correctCount ?? countCorrect(questions, answers);
  const total = questions.length;
  const percent = saved?.score ?? Math.round((correctCount / total) * 100);
  const passed = saved?.passed ?? percent >= test.passScore;
  const wrong = questions.filter((q) => answers[q.id] !== q.correct);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View
        style={[styles.summary, passed ? styles.summaryPassed : styles.summaryFailed]}
        accessible
        accessibilityLabel={`${correctCount} z ${total}, ${percent} percent, ${
          passed ? "test úspešný" : "test neúspešný"
        }`}
      >
        <Text style={styles.score}>
          {correctCount}/{total}
        </Text>
        <Text style={styles.percent}>{percent} %</Text>
        <Text style={styles.verdict}>
          {passed ? "Test úspešný" : "Test neúspešný"} (min. {test.passScore} %)
        </Text>
      </View>

      <View style={styles.saveRow}>
        {status === "saving" ? (
          <>
            <ActivityIndicator color={Palette.primary} />
            <Text style={styles.saveText}>Ukladám výsledok…</Text>
          </>
        ) : null}
        {status === "saved" ? (
          <Text style={styles.saveText}>Výsledok je uložený.</Text>
        ) : null}
        {status === "error" ? (
          <>
            <Text style={[styles.saveText, styles.saveError]}>{saveError}</Text>
            <PressableScale
              onPress={retrySave}
              accessibilityRole="button"
              accessibilityLabel="Skúsiť uložiť znova"
            >
              <Text style={styles.retryLink}>Skúsiť znova</Text>
            </PressableScale>
          </>
        ) : null}
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
        accessibilityLabel="Zopakovať test"
      >
        <Text style={styles.primaryText}>Zopakovať test</Text>
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
  },
  summaryPassed: {
    backgroundColor: Palette.successMuted,
    borderColor: Palette.successBorder,
  },
  summaryFailed: {
    backgroundColor: Palette.dangerSoft,
    borderColor: Palette.dangerBorder,
  },
  score: {
    fontFamily: Font.displayBold,
    fontSize: 56,
    lineHeight: 60,
    color: Palette.text,
  },
  percent: {
    fontFamily: Font.bodySemiBold,
    fontSize: 22,
    color: Palette.text,
  },
  verdict: {
    fontFamily: Font.body,
    fontSize: 15,
    color: Palette.textButtonSecondary,
    marginTop: 4,
  },
  saveRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    minHeight: 40,
    marginVertical: 12,
    flexWrap: "wrap",
  },
  saveText: { fontFamily: Font.body, fontSize: 14, color: Palette.textSecondary },
  saveError: { color: Palette.danger },
  retryLink: { fontFamily: Font.bodySemiBold, fontSize: 14, color: Palette.primary },
  wrongSection: { marginBottom: 12 },
  wrongTitle: {
    fontFamily: Font.displayBold,
    fontSize: 20,
    color: Palette.text,
    marginBottom: 10,
  },
  wrongCard: {
    backgroundColor: Palette.surface,
    borderLeftWidth: 3,
    borderLeftColor: Palette.danger,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  wrongQuestion: {
    fontFamily: Font.body,
    fontSize: 15,
    lineHeight: 21,
    color: Palette.text,
  },
  wrongCorrect: {
    fontFamily: Font.bodySemiBold,
    fontSize: 14,
    color: Palette.success,
    marginTop: 6,
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: Palette.primary,
    borderRadius: 14,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    color: Palette.onPrimary,
  },
  secondaryButton: {
    marginTop: 10,
    backgroundColor: Palette.surface,
    borderRadius: 14,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    color: Palette.textButtonSecondary,
  },
});
