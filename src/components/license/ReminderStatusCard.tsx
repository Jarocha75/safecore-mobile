import { Ionicons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { LicenseReminder } from "@/types/license";
import { formatIsoDate } from "@/utils/date";

type ReminderStatusCardProps = {
  reminder: LicenseReminder;
  removing: boolean;
  error: string | null;
  onRemove: () => void;
};

/** Stav uloženého SMS upozornenia s možnosťou zrušiť ho. */
export default function ReminderStatusCard({
  reminder,
  removing,
  error,
  onRemove,
}: ReminderStatusCardProps) {
  const confirmRemove = () => {
    Alert.alert(
      "Zrušiť upozornenie",
      "Už ti nebudeme posielať SMS o konci platnosti tohto preukazu.",
      [
        { text: "Ponechať", style: "cancel" },
        { text: "Zrušiť upozornenie", style: "destructive", onPress: onRemove },
      ],
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="notifications" size={20} color={Palette.primary} />
        <Text style={styles.title}>SMS upozornenie je zapnuté</Text>
      </View>
      <Text style={styles.text}>
        Platnosť do {formatIsoDate(reminder.validUntil)} · číslo končí na{" "}
        {reminder.phoneLast3}. Údaje nižšie ho môžu prepísať.
      </Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <PressableScale
        style={[styles.button, removing && styles.buttonDisabled]}
        onPress={() => {
          if (!removing) confirmRemove();
        }}
        accessibilityRole="button"
        accessibilityLabel="Zrušiť upozornenie"
        accessibilityState={{ disabled: removing }}
      >
        <Text style={styles.buttonText}>
          {removing ? "Ruším…" : "Zrušiť upozornenie"}
        </Text>
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  title: { fontFamily: Font.bodySemiBold, fontSize: 16, color: Palette.text },
  text: {
    fontFamily: Font.body,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.textSecondary,
  },
  errorText: {
    marginTop: 8,
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.danger,
  },
  button: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Palette.dangerBorder,
    backgroundColor: Palette.dangerSoft,
    paddingVertical: 11,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { fontFamily: Font.bodySemiBold, fontSize: 15, color: Palette.danger },
});
