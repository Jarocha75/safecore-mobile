import { useLocalSearchParams } from "expo-router";

import CourseTestsScreen from "@/components/screens/CourseTestsScreen";

export default function CourseTests() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  return <CourseTestsScreen courseId={courseId} />;
}
