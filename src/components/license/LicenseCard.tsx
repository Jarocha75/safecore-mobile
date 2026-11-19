import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { CardStyles } from "@/constants/card-styles";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { LicenseCardItem } from "@/types/license";

type LicenseCardProps = {
  license: LicenseCardItem;
  /** Kam karta vedie (detail preukazu alebo formulár upozornenia). */
  href: Href;
  /** Druhý riadok pod názvom (stav platnosti alebo stav SMS upozornenia). */
  subtitle?: string | null;
  /** Farba druhého riadku; predvolene sivá. */
  subtitleColor?: string;
};

/** Riadková karta typu preukazu s krátkym stavom; ťuknutím sa otvorí `href`. */
export default function LicenseCard({
  license,
  href,
  subtitle,
  subtitleColor,
}: LicenseCardProps) {
  return (
    <PressableScale
      style={CardStyles.listCard}
      onPress={() => router.push(href)}
      accessibilityRole="button"
      accessibilityLabel={license.title}
    >
      <View style={CardStyles.iconBox}>{license.icon}</View>
      <View style={styles.text}>
        <Text style={styles.title}>{license.title}</Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              subtitleColor ? { color: subtitleColor } : null,
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  text: { flex: 1 },
  title: { fontFamily: Font.bodySemiBold, fontSize: 18, color: Palette.text },
  subtitle: {
    fontFamily: Font.body,
    fontSize: 13,
    color: Palette.textSecondary,
    marginTop: 2,
  },
});
