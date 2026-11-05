import CustomHeader from "@/components/CustomHeader";
import CourseCard from "@/components/CourseCard";
import { Palette } from "@/constants/palette";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Course = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

const COURSES: Course[] = [
  {
    id: "zbrojny-preukaz",
    icon: "shield-checkmark",
    title: "Zbrojný preukaz",
    description: "Skupiny A, B, C, D, E – Testy a legislatíva",
  },
  {
    id: "sbs-s",
    icon: "lock-closed",
    title: "SBS – Preukaz Typ S",
    description: "Strážna služba a odborná príprava",
  },
  {
    id: "sbs-p",
    icon: "business",
    title: "SBS – Preukaz Typ P",
    description: "Fyzická ochrana a detektívna služba",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader
        title="Vitaj v SafeCore 👋"
        description="Tvoja profesionálna príprava na skúšky"
        onNotificationPress={() => console.log("Klik na notifikácie")}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
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
  contentContainer: {
    padding: 20,
  },
});
