import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { ApiPath } from "@/constants/api";
import { CardStyles } from "@/constants/card-styles";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useApiResource } from "@/hooks/useApiResource";
import type { ExamSetsResponse } from "@/types/exam";
import { questionCountLabel } from "@/utils/quiz";

const SECTION_TITLE = "Otázky na skúšku";
const SECTION_HINT = "Odpovedz sám a potom si zobraz správnu odpoveď.";

/** Sekcia sád otázok na skúšku v zozname testov kurzu Z. */
export default function ExamSetsSection({ courseId }: { courseId: string }) {
  const { data, error, loading, reload } = useApiResource<ExamSetsResponse>(
    ApiPath.examSets(courseId),
  );
  const sets = data?.sets ?? [];

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{SECTION_TITLE}</Text>
      <Text style={styles.hint}>{SECTION_HINT}</Text>

      {loading ? (
        <ActivityIndicator
          color={Palette.primary}
          style={styles.loader}
          accessibilityLabel="Načítavam"
        />
      ) : error ? (
        <PressableScale
          style={CardStyles.listCard}
          onPress={reload}
          accessibilityRole="button"
          accessibilityLabel={`${error} Skúsiť znova`}
        >
          <Text style={styles.error}>{error} Skúsiť znova</Text>
        </PressableScale>
      ) : (
        sets.map((set) => (
          <PressableScale
            key={set.id}
            style={CardStyles.listCard}
            onPress={() => router.push(`/exam-set/${courseId}/${set.id}`)}
            accessibilityRole="button"
            accessibilityLabel={`${set.title}, ${questionCountLabel(set.questionCount)}`}
          >
            <View style={CardStyles.iconBox}>
              <Ionicons name="reader" size={26} color={Palette.primary} />
            </View>
            <View style={styles.texts}>
              <Text style={styles.title}>{set.title}</Text>
              <Text style={styles.meta}>
                {questionCountLabel(set.questionCount)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
          </PressableScale>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 16 },
  heading: {
    fontFamily: Font.displayBold,
    fontSize: 22,
    color: Palette.text,
  },
  hint: {
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.textSecondary,
    marginTop: 2,
    marginBottom: 12,
  },
  loader: { marginVertical: 16 },
  error: {
    flex: 1,
    fontFamily: Font.body,
    fontSize: 15,
    color: Palette.danger,
  },
  texts: { flex: 1 },
  title: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    lineHeight: 22,
    color: Palette.text,
  },
  meta: {
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.textSecondary,
    marginTop: 2,
  },
});
