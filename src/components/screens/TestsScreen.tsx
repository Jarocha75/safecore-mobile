import CourseCard from "@/components/CourseCard";
import CustomHeader from "@/components/CustomHeader";
import { COURSES } from "@/constants/courses";
import { Font } from "@/constants/typography";
import { Palette } from "@/constants/palette";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader
        title="Testy"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionDescription}>
          Vyber si kategóriu preukazu, na ktorú sa chceš pripraviť. Každý modul
          obsahuje legislatívu a cvičné testy.
        </Text>

        {COURSES.map((course) => (
          <CourseCard
            key={course.id}
            icon={course.icon}
            title={course.title}
            description={course.description}
          />
        ))}
      </ScrollView>
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
    color: Palette.textSecondary,
    marginBottom: 20,
    lineHeight: 23,
  },
});
