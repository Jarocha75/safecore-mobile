import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CourseCard from "@/components/CourseCard";
import { Palette } from "@/constants/palette";

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
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: insets.top + 20 },
      ]}
    >
      {/* Vitacia hlavička */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Vitaj v SafeCore 👋</Text>
        <Text style={styles.subtitleText}>
          Tvoja profesionálna príprava na skúšky
        </Text>
      </View>

      {COURSES.map((course) => (
        <CourseCard
          key={course.id}
          icon={course.icon}
          title={course.title}
          description={course.description}
        />
      ))}
    </ScrollView>
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
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Palette.text,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: Palette.textSecondary,
  },
});
