import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Font } from "@/constants/typography";
import { Palette } from "@/constants/palette";

type ScreenTopBarProps = { title: string };

/** Horná lišta podstránok: tlačidlo späť + vycentrovaný názov. */
export default function ScreenTopBar({ title }: ScreenTopBarProps) {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Späť"
      >
        <Ionicons name="chevron-back" size={22} color={Palette.text} />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.backButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontFamily: Font.displayBold,
    fontSize: 20,
    color: Palette.text,
  },
});
