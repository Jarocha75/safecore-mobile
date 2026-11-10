import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { ExamQuestion } from "@/types/exam";

/** Otázka, na ktorú si používateľ odpovie sám; správna odpoveď sa zobrazí na požiadanie. */
export default function ExamQuestionCard({
  question,
}: {
  question: ExamQuestion;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.part}>
        {question.part} · {question.subject}
      </Text>
      <Text style={styles.question}>{question.question}</Text>

      {revealed ? (
        <View style={styles.answerBox}>
          <Text style={styles.answer}>{question.answer}</Text>
        </View>
      ) : null}

      <PressableScale
        style={styles.toggle}
        onPress={() => setRevealed((v) => !v)}
        accessibilityRole="button"
        accessibilityLabel={revealed ? "Skryť odpoveď" : "Zobraziť odpoveď"}
      >
        <Text style={styles.toggleText}>
          {revealed ? "Skryť odpoveď" : "Zobraziť odpoveď"}
        </Text>
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  part: {
    fontFamily: Font.bodyMedium,
    fontSize: 13,
    lineHeight: 18,
    color: Palette.primary,
    marginBottom: 8,
  },
  question: {
    fontFamily: Font.bodySemiBold,
    fontSize: 18,
    lineHeight: 25,
    color: Palette.text,
  },
  answerBox: {
    backgroundColor: Palette.successMuted,
    borderColor: Palette.successBorder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  answer: {
    fontFamily: Font.body,
    fontSize: 16,
    lineHeight: 23,
    color: Palette.text,
  },
  toggle: {
    backgroundColor: Palette.surfaceRaised,
    borderRadius: 14,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  toggleText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 16,
    color: Palette.primary,
  },
});
