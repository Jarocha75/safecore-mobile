import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type ProfileMenuItemData = {
  id: string;
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  /** Bez obsluhy je položka zatiaľ neaktívna. */
  onPress?: () => void;
};
