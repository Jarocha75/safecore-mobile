import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import PracticeExamResult from "@/components/exam/PracticeExamResult";
import QuestionView from "@/components/quiz/QuestionView";
import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { PracticeExam } from "@/types/practice-exam";
import type { QuizAnswers } from "@/types/quiz";
import { formatTime } from "@/utils/practice-exam";

const WARNING_SECONDS = 5 * 60;

type PracticeExamRunnerProps = {
  exam: PracticeExam;
  onRestart: () => void;
};

/** Jeden pokus o cvičný test: odpočet času, po odpovedi hneď vidno správnosť, po vypršaní času sa test vyhodnotí. */
export default function PracticeExamRunner({
  exam,
  onRestart,
}: PracticeExamRunnerProps) {
  const { questions } = exam;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [finished, setFinished] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  // Koniec sa počíta z času, nie z počtu tikov – odpočet beží správne aj po návrate z pozadia.
  const [deadline] = useState(() => Date.now() + exam.durationMinutes * 60_000);
  const [secondsLeft, setSecondsLeft] = useState(exam.durationMinutes * 60);

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) {
        setTimedOut(true);
        setFinished(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [finished, deadline]);

  if (finished) {
    return (
      <PracticeExamResult
        exam={exam}
        answers={answers}
        timedOut={timedOut}
        onRestart={onRestart}
      />
    );
  }

  const question = questions[index];
  const answered = answers[question.id] !== undefined;
  const isLast = index === questions.length - 1;
  const done = index + (answered ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.counter}>
          Otázka {index + 1} <Text style={styles.total}>/ {questions.length}</Text>
        </Text>
        <Text
          style={[styles.timer, secondsLeft <= WARNING_SECONDS && styles.timerWarning]}
          accessibilityRole="timer"
          accessibilityLabel={`Zostáva ${formatTime(secondsLeft)}`}
        >
          {formatTime(secondsLeft)}
        </Text>
      </View>

      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: questions.length, now: done }}
      >
        <View style={[styles.fill, { width: `${(done / questions.length) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <QuestionView
          question={question}
          selected={answers[question.id]}
          onSelect={(option) => {
            // Odpoveď sa po voľbe nedá meniť, ako na skúške.
            if (answered) return;
            setAnswers((prev) => ({ ...prev, [question.id]: option }));
          }}
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  counter: { fontFamily: Font.displayBold, fontSize: 20, color: Palette.text },
  total: { fontFamily: Font.body, fontSize: 16, color: Palette.textSecondary },
  timer: {
    fontFamily: Font.displayBold,
    fontSize: 22,
    color: Palette.primary,
    fontVariant: ["tabular-nums"],
  },
  timerWarning: { color: Palette.danger },
  track: { height: 4, backgroundColor: Palette.border, marginHorizontal: 20 },
  fill: { height: "100%", backgroundColor: Palette.primary, borderRadius: 2 },
  content: { padding: 20, paddingBottom: 24 },
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
