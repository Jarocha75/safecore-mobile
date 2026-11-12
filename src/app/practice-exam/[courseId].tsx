import { useLocalSearchParams } from "expo-router";

import PracticeExamScreen from "@/components/screens/PracticeExamScreen";

export default function PracticeExam() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  return <PracticeExamScreen courseId={courseId} />;
}
