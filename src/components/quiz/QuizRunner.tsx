import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import QuestionView from "@/components/quiz/QuestionView";
import QuizResult from "@/components/quiz/QuizResult";
import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { QuizAnswers, QuizTest } from "@/types/quiz";
import { shuffle } from "@/utils/quiz";

type QuizRunnerProps = {
  test: QuizTest;
  /** Zavolá sa pri „Zopakovať test“; rodič komponent znova vytvorí (nové poradie otázok). */
  onRestart: () => void;
};

/** Jeden pokus o test: otázky v náhodnom poradí, po odpovedi hneď vidno správnosť. */
export default function QuizRunner({ test, onRestart }: QuizRunnerProps) {
  const [questions] = useState(() => shuffle(test.questions));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [finished, setFinished] = useState(false);

  if (finished) {
    return (
      <QuizResult
        test={test}
        questions={questions}
        answers={answers}
        onRestart={onRestart}
      />
    );
  }

  const question = questions[index];
  const answered = answers[question.id] !== undefined;
  const isLast = index === questions.length - 1;
  const progress = ((index + (answered ? 1 : 0)) / questions.length) * 100;

  return (
    <View style={styles.container}>
      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: questions.length, now: index + (answered ? 1 : 0) }}
      >
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.counter}>
          Otázka {index + 1} <Text style={styles.total}>/ {questions.length}</Text>
        </Text>

        <QuestionView
          question={question}
          selected={answers[question.id]}
          onSelect={(option) =>
            setAnswers((prev) => ({ ...prev, [question.id]: option }))
          }
        />
      </ScrollView>

      <View style={styles.footer}>
        <PressableScale
          style={[styles.navButton, styles.prevButton]}
          onPress={index > 0 ? () => setIndex((i) => i - 1) : undefined}
          accessibilityRole="button"
          accessibilityLabel="Predchádzajúca otázka"
        >
          <Text style={styles.prevText}>Späť</Text>
        </PressableScale>
        <PressableScale
          style={[styles.navButton, styles.nextButton, !answered && styles.nextDisabled]}
          onPress={
            answered
              ? () => (isLast ? setFinished(true) : setIndex((i) => i + 1))
              : undefined
          }
          accessibilityRole="button"
          accessibilityLabel={isLast ? "Zobraziť výsledok" : "Ďalšia otázka"}
        >
          <Text style={styles.nextText}>{isLast ? "Výsledok" : "Ďalej"}</Text>
        </PressableScale>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  track: { height: 4, backgroundColor: Palette.border, marginHorizontal: 20 },
  fill: { height: "100%", backgroundColor: Palette.primary, borderRadius: 2 },
  content: { padding: 20, paddingBottom: 24 },
  counter: {
    fontFamily: Font.displayBold,
    fontSize: 20,
    color: Palette.text,
    marginBottom: 16,
  },
  total: { fontFamily: Font.body, fontSize: 16, color: Palette.textSecondary },
  footer: { flexDirection: "row", gap: 10, paddingHorizontal: 20, paddingBottom: 8 },
  navButton: {
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  prevButton: { flex: 1, backgroundColor: Palette.surface },
  prevText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    color: Palette.textButtonSecondary,
  },
  nextButton: { flex: 2, backgroundColor: Palette.primary },
  nextDisabled: { opacity: 0.4 },
  nextText: { fontFamily: Font.bodySemiBold, fontSize: 17, color: Palette.onPrimary },
});
