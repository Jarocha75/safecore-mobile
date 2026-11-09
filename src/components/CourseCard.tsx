import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { CardStyles } from "@/constants/card-styles";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";

type CourseCardProps = {
  /** Hotová ikona (z ľubovoľnej sady), napr. <Ionicons ... />. */
  icon: ReactNode;
  title: string;
  description: string;
  onPress?: () => void;
};

export default function CourseCard({
  icon,
  title,
  description,
  onPress,
}: CourseCardProps) {
  return (
    <PressableScale
      style={CardStyles.listCard}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
    >
      <View style={CardStyles.iconBox}>{icon}</View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    fontFamily: Font.bodySemiBold,
    fontSize: 18,
    color: Palette.text,
    marginBottom: 2,
  },
  description: {
    fontFamily: Font.body,
    fontSize: 15,
    lineHeight: 20,
    color: Palette.textSecondary,
  },
});
