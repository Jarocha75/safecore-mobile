import CourseCard from "@/components/CourseCard";
import CustomHeader from "@/components/CustomHeader";
import { COURSES } from "@/constants/courses";
import { Palette } from "@/constants/palette";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader
        title="Testy"
        onNotificationPress={() => console.log("Notifikácie")}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
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
            onPress={() => console.log(`Klik na ${course.title}`)}
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
    padding: 20,
    paddingBottom: 40,
  },
  sectionDescription: {
    fontSize: 14,
    color: Palette.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
});
