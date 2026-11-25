import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomHeaderProps {
  title: string;
  description?: string;
}

export default function CustomHeader({ title, description }: CustomHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.brandRow}>
        <View style={styles.brand}>
          <Image
            source={require("@/assets/logo/logo-dark-removebg-preview.png")}
            style={styles.logo}
            contentFit="contain"
            accessibilityLabel="SafeCore logo"
          />
          <Text style={styles.brandText}>SafeCore</Text>
        </View>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/notifications")}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Notifikácie"
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={Palette.textButtonSecondary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 40,
    height: 40,
  },
  brandText: {
    fontFamily: Font.displayBold,
    fontSize: 20,
    color: Palette.textButtonSecondary,
  },
  title: {
    fontFamily: Font.displayBold,
    fontSize: 32,
    lineHeight: 36,
    color: Palette.text,
  },
  description: {
    fontFamily: Font.body,
    fontSize: 16,
    lineHeight: 22,
    color: Palette.textSecondary,
    marginTop: 4,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Palette.surface,
    justifyContent: "center",
    alignItems: "center",
  },
});
