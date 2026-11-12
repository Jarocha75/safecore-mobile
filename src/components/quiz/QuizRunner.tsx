import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import QuestionView from "@/components/quiz/QuestionView";
import QuizResult from "@/components/quiz/QuizResult";
import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useSession } from "@/context/SessionContext";
import type { QuizAnswers, QuizTest } from "@/types/quiz";
import type { SavedStudy } from "@/types/study";
import { shuffle } from "@/utils/quiz";
import { clearStudy, saveStudy } from "@/utils/study-storage";

type QuizRunnerProps = {
  test: QuizTest;
  /** Zavolá sa pri „Zopakovať test“; rodič komponent znova vytvorí (nové poradie otázok). */
  onRestart: () => void;
  /** Názov kurzu a jeho id pre kartu „Pokračuj v štúdiu“. */
  course?: { id: string; title: string };
  /** Uložený rozpracovaný pokus; ak nesedí s otázkami testu, ignoruje sa. */
  saved?: SavedStudy | null;
};

/** Obnoví uložené poradie otázok, len ak sedí s aktuálnymi otázkami testu. */
function restoreOrder(test: QuizTest, saved?: SavedStudy | null) {
  if (!saved || saved.order.length !== test.questions.length) return null;
  const byId = new Map(test.questions.map((q) => [q.id, q]));
  const ordered = saved.order.map((id) => byId.get(id));
  return ordered.every(Boolean) ? (ordered as QuizTest["questions"]) : null;
}

/** Jeden pokus o test: otázky v náhodnom poradí, po odpovedi hneď vidno správnosť. */
export default function QuizRunner({
  test,
  onRestart,
  course,
  saved,
}: QuizRunnerProps) {
  const { session } = useSession();
  const userId = session?.user.id;
  const [restored] = useState(() => restoreOrder(test, saved));
  const [questions] = useState(() => restored ?? shuffle(test.questions));
  const [index, setIndex] = useState(() =>
    restored && saved ? Math.min(saved.index, restored.length - 1) : 0,
  );
  const [answers, setAnswers] = useState<QuizAnswers>(() =>
    restored && saved ? saved.answers : {},
  );
  const [finished, setFinished] = useState(false);

  // Postup sa ukladá po každej odpovedi a zmene otázky; po dokončení sa zmaže.
  useEffect(() => {
    if (!userId) return;
    if (finished) {
      void clearStudy(userId);
      return;
    }
    // Test, v ktorom používateľ ešte neodpovedal, nie je „rozpracovaný“.
    if (Object.keys(answers).length === 0) return;
    void saveStudy(userId, {
      testId: test.id,
      courseId: course?.id,
      courseTitle: course?.title ?? "Test",
      testTitle: test.title,
      questionNumber: index + 1,
      totalQuestions: questions.length,
      order: questions.map((q) => q.id),
      answers,
      index,
    });
  }, [userId, finished, index, answers, test, course, questions]);

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
