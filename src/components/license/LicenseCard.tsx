import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { CardStyles } from "@/constants/card-styles";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { LicenseCardItem, LicenseReminder } from "@/types/license";
import { formatIsoDate } from "@/utils/date";

type LicenseCardProps = {
  license: LicenseCardItem;
  reminder: LicenseReminder | null;
  /** Aj pri vypnutom upozornení zobraziť stav (obrazovka Notifikácie). */
  showOffStatus?: boolean;
};

/** Karta typu preukazu so stavom SMS upozornenia; ťuknutím sa otvorí formulár. */
export default function LicenseCard({
  license,
  reminder,
  showOffStatus,
}: LicenseCardProps) {
  const subtitle = reminder
    ? `SMS upozornenie · platnosť do ${formatIsoDate(reminder.validUntil)}`
    : showOffStatus
      ? "SMS upozornenie nie je zapnuté"
      : null;

  return (
    <PressableScale
      style={CardStyles.listCard}
      onPress={() => router.push(license.href)}
      accessibilityRole="button"
      accessibilityLabel={license.title}
    >
      <View style={CardStyles.iconBox}>{license.icon}</View>
      <View style={styles.text}>
        <Text style={styles.title}>{license.title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
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
