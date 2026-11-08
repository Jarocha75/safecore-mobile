import ScreenTopBar from "@/components/ui/ScreenTopBar";
import PrepCourseCard from "@/components/courses/PrepCourseCard";
import { COURSE_DETAILS } from "@/constants/course-details";
import { Palette } from "@/constants/palette";
import { PREP_COURSES } from "@/constants/prep-courses";
import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CoursesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenTopBar title="Kurzy a príprava" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {PREP_COURSES.map((course) => (
          <PrepCourseCard
            key={course.id}
            course={course}
            onPress={() =>
              COURSE_DETAILS[course.id]
                ? router.push({
                    pathname: "/courses/[id]",
                    params: { id: course.id },
                  })
                : console.log(`Klik na ${course.title}`)
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
});
