import CourseCard from "@/components/CourseCard";
import CustomHeader from "@/components/CustomHeader";
import AsyncState from "@/components/ui/AsyncState";
import { COURSE_TYPE_META } from "@/constants/courses";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useSession } from "@/context/SessionContext";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EMPTY_TEXT =
  "Kurzy sa nepodarilo načítať. Skontroluj pripojenie a otvor appku znova.";

export default function TestsScreen() {
  const { session } = useSession();
  const courses = session?.courses ?? [];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader title="Testy" />

      {courses.length === 0 ? (
        <AsyncState emptyText={EMPTY_TEXT} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionDescription}>
            Vyber si kurz, na ktorý sa chceš pripraviť. Každý kurz obsahuje
            cvičné testy.
          </Text>

          {courses.map((course) => (
            <CourseCard
              key={course.id}
              icon={COURSE_TYPE_META[course.type].icon}
              title={course.title}
              description={COURSE_TYPE_META[course.type].description}
              onPress={() => router.push(`/course-tests/${course.id}`)}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  sectionDescription: {
    fontFamily: Font.body,
    fontSize: 16,
    lineHeight: 23,
    color: Palette.textSecondary,
    marginBottom: 20,
  },
});
