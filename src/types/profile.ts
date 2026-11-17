import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type ProfileMenuItemData = {
  id: string;
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  /** Bez obsluhy je položka zatiaľ neaktívna. */
  onPress?: () => void;
};

/** Odkaz na právny dokument na webe (otvorí sa v prehliadači). */
export type LegalLink = {
  id: string;
  title: string;
  url: string;
  icon: ComponentProps<typeof Ionicons>["name"];
};
