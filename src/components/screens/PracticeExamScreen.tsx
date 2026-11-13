import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PracticeExamRunner from "@/components/exam/PracticeExamRunner";
import AsyncState from "@/components/ui/AsyncState";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { ApiPath } from "@/constants/api";
import { Palette } from "@/constants/palette";
import { useApiResource } from "@/hooks/useApiResource";
import type { PracticeExam } from "@/types/practice-exam";

export default function PracticeExamScreen({ courseId }: { courseId: string }) {
  const { data, error, loading, reload } = useApiResource<PracticeExam>(
    ApiPath.practiceExam(courseId),
    { cache: false },
  );
  // Zmena kľúča znova vytvorí pokus (nový test, nový čas, prázdne odpovede).
  const [run, setRun] = useState(0);

  const restart = () => {
    reload();
    setRun((n) => n + 1);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title={data?.title ?? "Cvičný test"} />

      {!data || loading || data.questions.length === 0 ? (
        <AsyncState
          loading={loading}
          error={error}
          onRetry={reload}
          emptyText="Cvičný test sa nepodarilo zložiť."
        />
      ) : (
        <PracticeExamRunner key={run} exam={data} onRestart={restart} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
});
