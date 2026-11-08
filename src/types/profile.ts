import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type ProfileUser = {
  name: string;
  email: string;
  membership: string;
};

export type ProfileMenuItemData = {
  id: string;
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  /** Bez obsluhy je položka zatiaľ neaktívna. */
  onPress?: () => void;
};
