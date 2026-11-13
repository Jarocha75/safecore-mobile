import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import { useIsOnline } from "@/hooks/useIsOnline";

/** Úzky pás nad obsahom, kým je zariadenie offline. */
export default function OfflineBanner() {
  const online = useIsOnline();
  const insets = useSafeAreaInsets();
  if (online) return null;

  return (
    <View
      style={[styles.banner, { paddingTop: insets.top + 6 }]}
      accessibilityRole="alert"
    >
      <Text style={styles.text}>Si offline – zobrazujú sa uložené dáta</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Palette.stampSoft,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Palette.stampBorder,
    paddingBottom: 6,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  text: {
    fontFamily: Font.bodyMedium,
    fontSize: 13,
    color: Palette.stamp,
  },
});
