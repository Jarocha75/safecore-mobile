import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Palette } from "@/constants/palette";
import type { PrepCourse } from "@/types/course";

type PrepCourseCardProps = {
  course: PrepCourse;
  onPress?: () => void;
};

export default function PrepCourseCard({
  course,
  onPress,
}: PrepCourseCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${course.title}. ${course.subtitle}`}
    >
      <View style={styles.titleRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{course.badge}</Text>
        </View>
        <Text style={styles.title}>{course.title}</Text>
      </View>

      <Text style={styles.subtitle}>{course.subtitle}</Text>
      {course.description ? (
        <Text style={styles.description}>{course.description}</Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Palette.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontSize: 20, fontWeight: "bold", color: Palette.text },
  title: { flex: 1, fontSize: 20, fontWeight: "bold", color: Palette.text },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Palette.primary,
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: Palette.textSecondary,
    lineHeight: 20,
    marginTop: 8,
  },
});
