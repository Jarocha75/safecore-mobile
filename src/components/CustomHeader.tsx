import { Palette } from "@/constants/palette";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  showNotification?: boolean;
  onNotificationPress?: () => void;
}

export default function CustomHeader({
  title,
  subtitle,
  description,
  showNotification = true,
  onNotificationPress,
}: CustomHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>

      {showNotification && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications-outline" size={22} color={Palette.textButtonSecondary} />
          <View style={styles.badge} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: Palette.background,
    borderBottomWidth: 1,
    borderBottomColor: Palette.surface,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Palette.text,
  },
  description: {
    fontSize: 14,
    color: Palette.textSecondary,
    marginTop: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Palette.border,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.primary,
  },
});
