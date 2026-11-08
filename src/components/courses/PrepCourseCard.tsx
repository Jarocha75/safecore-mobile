import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { PrepCourse } from "@/types/course";

type PrepCourseCardProps = {
  course: PrepCourse;
  onPress?: () => void;
};

/** Karta kurzu ako doklad: vľavo veľké písmeno typu preukazu, vpravo text. */
export default function PrepCourseCard({
  course,
  onPress,
}: PrepCourseCardProps) {
  return (
    <PressableScale
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${course.title}. ${course.subtitle}`}
    >
      <View style={styles.plate}>
        <Text style={styles.letter}>{course.badge}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.subtitle}>{course.subtitle}</Text>
        {course.description ? (
          <Text style={styles.description}>{course.description}</Text>
        ) : null}
      </View>

      <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: Palette.surface,
    borderRadius: 22,
    padding: 10,
    paddingRight: 16,
    marginBottom: 12,
    gap: 14,
  },
  plate: {
    width: 84,
    borderRadius: 14,
    backgroundColor: Palette.surfaceRaised,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 3,
    borderLeftColor: Palette.primary,
  },
  letter: {
    fontFamily: Font.displayBold,
    fontSize: 60,
    lineHeight: 66,
    color: Palette.textButtonSecondary,
  },
  body: { flex: 1, paddingVertical: 8 },
  title: {
    fontFamily: Font.displayBold,
    fontSize: 22,
    lineHeight: 25,
    color: Palette.text,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: Font.bodyMedium,
    fontSize: 15,
    lineHeight: 20,
    color: Palette.primary,
  },
  description: {
    fontFamily: Font.body,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.textSecondary,
    marginTop: 8,
  },
});
