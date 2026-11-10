import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ExamQuestionCard from "@/components/exam/ExamQuestionCard";
import AsyncState from "@/components/ui/AsyncState";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { ApiPath } from "@/constants/api";
import { Palette } from "@/constants/palette";
import { useApiResource } from "@/hooks/useApiResource";
import type { ExamSet } from "@/types/exam";

const EMPTY_TEXT = "Táto sada zatiaľ nemá žiadne otázky.";

export default function ExamSetScreen({
  courseId,
  setId,
}: {
  courseId: string;
  setId: string;
}) {
  const { data, error, loading, reload } = useApiResource<ExamSet>(
    ApiPath.examSet(courseId, setId),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title={data?.title ?? "Otázky na skúšku"} />

      {!data || data.questions.length === 0 ? (
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
          {data.questions.map((question) => (
            <ExamQuestionCard key={question.id} question={question} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
});
