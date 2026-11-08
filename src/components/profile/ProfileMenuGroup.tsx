import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { ProfileMenuItemData } from "@/types/profile";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  items: ProfileMenuItemData[];
};

export default function ProfileMenuGroup({ items }: Props) {
  return (
    <View style={styles.menuGroup}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={item.onPress}
          disabled={!item.onPress}
          accessibilityRole="button"
          accessibilityLabel={item.label}
          accessibilityState={{ disabled: !item.onPress }}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons
              name={item.icon}
              size={20}
              color={Palette.textSecondary}
            />
            <Text style={styles.menuItemText}>{item.label}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuGroup: {
    backgroundColor: Palette.surface,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 28,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 52,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Palette.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontFamily: Font.body,
    fontSize: 16,
    color: Palette.textButtonSecondary,
  },
});
