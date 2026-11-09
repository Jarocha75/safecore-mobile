import { useLocalSearchParams } from "expo-router";

import QuizScreen from "@/components/screens/QuizScreen";

export default function Quiz() {
  const { testId } = useLocalSearchParams<{ testId: string }>();
  return <QuizScreen testId={testId} />;
}
