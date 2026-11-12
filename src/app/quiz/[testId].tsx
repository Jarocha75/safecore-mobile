import { useLocalSearchParams } from "expo-router";

import QuizScreen from "@/components/screens/QuizScreen";

export default function Quiz() {
  const { testId, courseId } = useLocalSearchParams<{
    testId: string;
    courseId?: string;
  }>();
  return <QuizScreen testId={testId} courseId={courseId} />;
}
