import CourseDetailScreen from "@/components/screens/CourseDetailScreen";
import { useLocalSearchParams } from "expo-router";

export default function CourseDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <CourseDetailScreen courseId={id} />;
}
