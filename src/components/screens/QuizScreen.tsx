import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import QuizRunner from "@/components/quiz/QuizRunner";
import AsyncState from "@/components/ui/AsyncState";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { ApiPath } from "@/constants/api";
import { Palette } from "@/constants/palette";
import { useApiResource } from "@/hooks/useApiResource";
import type { QuizTest } from "@/types/quiz";

const EMPTY_TEXT = "Tento test zatiaľ nemá žiadne otázky.";

export default function QuizScreen({ testId }: { testId: string }) {
  const { data, error, loading, reload } = useApiResource<QuizTest>(
    ApiPath.test(testId),
  );
  // Zmena kľúča znova vytvorí pokus (nové poradie otázok, prázdne odpovede).
  const [run, setRun] = useState(0);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title={data?.title ?? "Test"} />

      {!data || data.questions.length === 0 ? (
        <AsyncState
          loading={loading}
          error={error}
          onRetry={reload}
          emptyText={EMPTY_TEXT}
        />
      ) : (
        <QuizRunner
          key={run}
          test={data}
          onRestart={() => setRun((n) => n + 1)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
});
