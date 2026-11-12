import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import QuizRunner from "@/components/quiz/QuizRunner";
import AsyncState from "@/components/ui/AsyncState";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { ApiPath } from "@/constants/api";
import { Palette } from "@/constants/palette";
import { useSession } from "@/context/SessionContext";
import { useApiResource } from "@/hooks/useApiResource";
import type { QuizTest } from "@/types/quiz";
import type { SavedStudy } from "@/types/study";
import { loadStudy } from "@/utils/study-storage";

const EMPTY_TEXT = "Tento test zatiaľ nemá žiadne otázky.";

type QuizScreenProps = { testId: string; courseId?: string };

export default function QuizScreen({ testId, courseId }: QuizScreenProps) {
  const { session } = useSession();
  const userId = session?.user.id;
  const { data, error, loading, reload } = useApiResource<QuizTest>(
    ApiPath.test(testId),
  );
  // Zmena kľúča znova vytvorí pokus (nové poradie otázok, prázdne odpovede).
  const [run, setRun] = useState(0);
  // Uložený postup sa načíta raz pred štartom; „undefined“ = ešte sa načítava.
  const [saved, setSaved] = useState<SavedStudy | null | undefined>(undefined);

  useEffect(() => {
    if (!userId) return;
    loadStudy(userId).then((study) =>
      setSaved(study?.testId === testId ? study : null),
    );
  }, [userId, testId]);

  const savedCourse = saved?.courseId ?? courseId;
  const course = session?.courses.find((c) => c.id === savedCourse);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title={data?.title ?? "Test"} />

      {!data || data.questions.length === 0 || saved === undefined ? (
        <AsyncState
          loading={loading || (!error && saved === undefined)}
          error={error}
          onRetry={reload}
          emptyText={EMPTY_TEXT}
        />
      ) : (
        <QuizRunner
          key={run}
          test={data}
          course={course ? { id: course.id, title: course.title } : undefined}
          saved={run === 0 ? saved : null}
          onRestart={() => setRun((n) => n + 1)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
});
