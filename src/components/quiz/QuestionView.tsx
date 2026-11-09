import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { QuizQuestion } from "@/types/quiz";
import { optionLetter } from "@/utils/quiz";

type QuestionViewProps = {
  question: QuizQuestion;
  /** Zvolená možnosť; `undefined`, kým používateľ neodpovedal. */
  selected?: number;
  onSelect: (index: number) => void;
};

/** Otázka s možnosťami; po odpovedi sa zvýrazní správna a prípadne zlá odpoveď. */
export default function QuestionView({
  question,
  selected,
  onSelect,
}: QuestionViewProps) {
  const answered = selected !== undefined;

  return (
    <View>
      <Text style={styles.question}>{question.text}</Text>

      {question.options.map((option, index) => {
        const isCorrect = index === question.correct;
        const isWrongPick = answered && index === selected && !isCorrect;
        const showCorrect = answered && isCorrect;

        return (
          <PressableScale
            key={index}
            style={[
              styles.option,
              showCorrect && styles.optionCorrect,
              isWrongPick && styles.optionWrong,
            ]}
            onPress={answered ? undefined : () => onSelect(index)}
            accessibilityRole="button"
            accessibilityLabel={`${optionLetter(index)}: ${option}${
              showCorrect ? ", správne" : isWrongPick ? ", nesprávne" : ""
            }`}
            accessibilityState={{ selected: answered && index === selected }}
          >
            <Text style={styles.letter}>{optionLetter(index)}</Text>
            <Text style={styles.optionText}>{option}</Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    fontFamily: Font.bodySemiBold,
    fontSize: 20,
    lineHeight: 28,
    color: Palette.text,
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Palette.surface,
    borderWidth: 1.5,
    borderColor: "transparent",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  optionCorrect: {
    backgroundColor: Palette.successMuted,
    borderColor: Palette.successBorder,
  },
  optionWrong: {
    backgroundColor: Palette.dangerSoft,
    borderColor: Palette.dangerBorder,
  },
  letter: {
    width: 24,
    fontFamily: Font.displayBold,
    fontSize: 20,
    color: Palette.primary,
  },
  optionText: {
    flex: 1,
    fontFamily: Font.body,
    fontSize: 16,
    lineHeight: 22,
    color: Palette.text,
  },
});
