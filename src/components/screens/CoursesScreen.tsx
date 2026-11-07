import PrepCourseCard from "@/components/courses/PrepCourseCard";
import { Palette } from "@/constants/palette";
import { PREP_COURSES } from "@/constants/prep-courses";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CoursesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
          accessibilityLabel="Späť"
        >
          <Ionicons name="chevron-back" size={22} color={Palette.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Kurzy a príprava</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {PREP_COURSES.map((course) => (
          <PrepCourseCard
            key={course.id}
            course={course}
            onPress={() => console.log(`Klik na ${course.title}`)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  topTitle: { fontSize: 18, fontWeight: "bold", color: Palette.text },
  scrollContent: { padding: 20, paddingBottom: 40 },
});
