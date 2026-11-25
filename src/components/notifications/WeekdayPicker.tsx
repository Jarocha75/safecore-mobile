import { Pressable, StyleSheet, Text, View } from "react-native";

import { REMINDER_WEEKDAYS } from "@/constants/local-notifications";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";

type WeekdayPickerProps = {
  selected: number[];
  onChange: (weekdays: number[]) => void;
};

/** Výber dní v týždni; aspoň jeden deň ostáva vždy vybraný. */
export default function WeekdayPicker({ selected, onChange }: WeekdayPickerProps) {
  const toggle = (day: number) => {
    const next = selected.includes(day)
      ? selected.filter((d) => d !== day)
      : [...selected, day];
    if (next.length > 0) onChange(next);
  };

  return (
    <View style={styles.row}>
      {REMINDER_WEEKDAYS.map(({ value, short, label }) => {
        const checked = selected.includes(value);
        return (
          <Pressable
            key={value}
            style={[styles.day, checked && styles.dayChecked]}
            onPress={() => toggle(value)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            accessibilityLabel={label}
          >
            <Text style={[styles.text, checked && styles.textChecked]}>{short}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", gap: 6 },
  day: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Palette.border,
    alignItems: "center",
    justifyContent: "center",
  },
  dayChecked: { backgroundColor: Palette.primary, borderColor: Palette.primary },
  text: { fontFamily: Font.bodySemiBold, fontSize: 14, color: Palette.textSecondary },
  textChecked: { color: Palette.onPrimary },
});
