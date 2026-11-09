import { Font } from "@/constants/typography";
import { Palette } from "@/constants/palette";
import { formatDate } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DateFieldProps = {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
};

export default function DateField({
  label,
  value,
  onChange,
  error,
  placeholder = "Vyber dátum",
  minimumDate,
  maximumDate,
}: DateFieldProps) {
  const [iosOpen, setIosOpen] = useState(false);

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "dismissed" || !date) return;
    onChange(date);
    // Po výbere dňa sa inline kalendár na iOS zatvorí.
    setIosOpen(false);
  };

  const open = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: value ?? new Date(),
        mode: "date",
        minimumDate,
        maximumDate,
        onChange: handleChange,
      });
    } else {
      setIosOpen((prev) => !prev);
    }
  };

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.input, error ? styles.inputError : null]}
        activeOpacity={0.8}
        onPress={open}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityValue={{ text: value ? formatDate(value) : placeholder }}
        accessibilityState={{ expanded: Platform.OS === "ios" ? iosOpen : undefined }}
      >
        <Text style={value ? styles.value : styles.placeholder}>
          {value ? formatDate(value) : placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={20} color={Palette.icon} />
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {Platform.OS === "ios" && iosOpen ? (
        <View style={styles.iosPicker}>
          <DateTimePicker
            value={value ?? new Date()}
            mode="date"
            display="inline"
            themeVariant="dark"
            accentColor={Palette.primary}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onChange={handleChange}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 18 },
  label: {
    fontFamily: Font.bodySemiBold,
    fontSize: 15,
    color: Palette.textButtonSecondary,
    marginBottom: 8,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Palette.surface,
    borderWidth: 1.5,
    borderColor: "transparent",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  inputError: { borderColor: Palette.danger },
  value: { fontFamily: Font.body, fontSize: 17, color: Palette.text },
  placeholder: { fontFamily: Font.body, fontSize: 17, color: Palette.icon },
  errorText: { marginTop: 6, fontFamily: Font.body, fontSize: 14, color: Palette.danger },
  iosPicker: {
    marginTop: 8,
    backgroundColor: Palette.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.border,
    overflow: "hidden",
  },
});
