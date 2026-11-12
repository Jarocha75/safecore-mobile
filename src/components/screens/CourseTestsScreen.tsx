import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ExamSetsSection from "@/components/exam/ExamSetsSection";
import AsyncState from "@/components/ui/AsyncState";
import PressableScale from "@/components/ui/PressableScale";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { ApiPath } from "@/constants/api";
import { CardStyles } from "@/constants/card-styles";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useSession } from "@/context/SessionContext";
import { useApiResource } from "@/hooks/useApiResource";
import type { CourseTestsResponse } from "@/types/quiz";
import { questionCountLabel } from "@/utils/quiz";

const EMPTY_TEXT = "Pre tento kurz zatiaľ nie sú pripravené žiadne testy.";

export default function CourseTestsScreen({ courseId }: { courseId: string }) {
  const { session } = useSession();
  const course = session?.courses.find((c) => c.id === courseId);
  const { data, error, loading, reload } = useApiResource<CourseTestsResponse>(
    ApiPath.courseTests(courseId),
  );
  const tests = data?.tests ?? [];
  // Kurz Z má popri testoch aj sady otázok na skúšku, preto prázdny zoznam testov nie je koniec.
  const hasExamSets = course?.type === "Z";

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title={course?.title ?? "Testy"} />

      {loading || error || (tests.length === 0 && !hasExamSets) ? (
        <AsyncState
          loading={loading}
          error={error}
          onRetry={reload}
          emptyText={EMPTY_TEXT}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {tests.map((test) => (
            <PressableScale
              key={test.id}
              style={CardStyles.listCard}
              onPress={() =>
                router.push({
                  pathname: "/quiz/[testId]",
                  params: { testId: test.id, courseId },
                })
              }
              accessibilityRole="button"
              accessibilityLabel={`${test.title}, ${questionCountLabel(test.questionCount)}`}
            >
              <View style={CardStyles.iconBox}>
                <Ionicons name="help-circle" size={28} color={Palette.primary} />
              </View>
              <View style={styles.texts}>
                <Text style={styles.title}>{test.title}</Text>
                <Text style={styles.meta}>
                  {questionCountLabel(test.questionCount)} · úspešnosť{" "}
                  {test.passScore} %
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
            </PressableScale>
          ))}
          {hasExamSets ? <ExamSetsSection courseId={courseId} /> : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
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
