import { StyleSheet } from "react-native";

import { Palette } from "@/constants/palette";

/** Spoločné štýly riadkových kariet (Testy, Preukaz) – ikona, text a šípka. */
export const CardStyles = StyleSheet.create({
  listCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Palette.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Palette.surfaceRaised,
    alignItems: "center",
    justifyContent: "center",
  },
});
