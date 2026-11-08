import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomHeaderProps {
  title: string;
  description?: string;
  showNotification?: boolean;
  onNotificationPress?: () => void;
}

export default function CustomHeader({
  title,
  description,
  showNotification = true,
  onNotificationPress,
}: CustomHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.brandRow}>
        <View style={styles.brand}>
          <Image
            source={require("../../assets/logo/logo-dark.png")}
            style={styles.logo}
            contentFit="contain"
            accessibilityLabel="SafeCore logo"
          />
          <Text style={styles.brandText}>SafeCore</Text>
        </View>

        {showNotification && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onNotificationPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Upozornenia"
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color={Palette.textButtonSecondary}
            />
            <View style={styles.badge} />
          </TouchableOpacity>
        )}
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
  badge: {
    position: "absolute",
    top: 11,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.primary,
    borderWidth: 1.5,
    borderColor: Palette.surface,
  },
});
