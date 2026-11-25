import DateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";

type ReminderTimeRowProps = {
  hour: number;
  minute: number;
  onChange: (hour: number, minute: number) => void;
};

/** Výber času pripomienky (iOS kompaktný výber, Android systémový dialóg). */
export default function ReminderTimeRow({ hour, minute, onChange }: ReminderTimeRowProps) {
  const value = new Date();
  value.setHours(hour, minute, 0, 0);
  const label = `${hour}:${String(minute).padStart(2, "0")}`;

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "dismissed" || !date) return;
    onChange(date.getHours(), date.getMinutes());
  };

  return (
    <View style={styles.row}>
      <Text style={styles.label}>Čas</Text>
      {Platform.OS === "ios" ? (
        <DateTimePicker
          value={value}
          mode="time"
          display="compact"
          themeVariant="dark"
          accentColor={Palette.primary}
          onChange={handleChange}
        />
      ) : (
        <Pressable
          onPress={() =>
            DateTimePickerAndroid.open({
              value,
              mode: "time",
              is24Hour: true,
              onChange: handleChange,
            })
          }
          accessibilityRole="button"
          accessibilityLabel="Čas pripomienky"
          accessibilityValue={{ text: label }}
        >
          <Text style={styles.value}>{label}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  label: { fontFamily: Font.body, fontSize: 16, color: Palette.text },
  value: { fontFamily: Font.bodySemiBold, fontSize: 18, color: Palette.primary, padding: 8 },
});
