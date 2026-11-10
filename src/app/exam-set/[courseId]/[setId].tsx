import { useLocalSearchParams } from "expo-router";

import ExamSetScreen from "@/components/screens/ExamSetScreen";

export default function ExamSet() {
  const { courseId, setId } = useLocalSearchParams<{
    courseId: string;
    setId: string;
  }>();
  return <ExamSetScreen courseId={courseId} setId={setId} />;
}
