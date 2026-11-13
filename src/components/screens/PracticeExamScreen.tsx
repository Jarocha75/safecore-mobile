import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PracticeExamRunner from "@/components/exam/PracticeExamRunner";
import AsyncState from "@/components/ui/AsyncState";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { ApiPath } from "@/constants/api";
import { Palette } from "@/constants/palette";
import { useSession } from "@/context/SessionContext";
import { useApiResource } from "@/hooks/useApiResource";
import type { PracticeExam } from "@/types/practice-exam";
import { loadPracticeVariants } from "@/utils/offline-download";

export default function PracticeExamScreen({ courseId }: { courseId: string }) {
  const { session, isOfflineAccessValid } = useSession();
  const userId = session?.user.id;
  const { data, error, loading, unreachable, reload } = useApiResource<PracticeExam>(
    ApiPath.practiceExam(courseId),
    { cache: false },
  );
  // Zmena kľúča znova vytvorí pokus (nový test, nový čas, prázdne odpovede).
  const [run, setRun] = useState(0);
  // Stiahnuté hotové testy, z ktorých sa offline vyberá (nový test sa skladá na serveri).
  const [variants, setVariants] = useState<PracticeExam[]>([]);
  const [offset] = useState(() => Math.floor(Math.random() * 1000));

  useEffect(() => {
    if (!userId) return;
    loadPracticeVariants(userId, courseId).then(setVariants);
  }, [userId, courseId]);

  const fallback =
    unreachable && variants.length > 0 && isOfflineAccessValid()
      ? variants[(offset + run) % variants.length]
      : null;
  const exam = data ?? fallback;

  const restart = () => {
    reload();
    setRun((n) => n + 1);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title={exam?.title ?? "Cvičný test"} />

      {!exam || (loading && !fallback) || exam.questions.length === 0 ? (
        <AsyncState
          loading={loading && !fallback}
          error={error}
          onRetry={reload}
          emptyText="Cvičný test sa nepodarilo zložiť."
        />
      ) : (
        <PracticeExamRunner key={run} exam={exam} onRestart={restart} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
});
