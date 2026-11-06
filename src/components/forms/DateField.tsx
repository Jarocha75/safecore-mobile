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
};

export default function DateField({
  label,
  value,
  onChange,
  error,
  placeholder = "Vyber dátum",
}: DateFieldProps) {
  const [iosOpen, setIosOpen] = useState(false);

  const handleChange = (_: DateTimePickerEvent, date?: Date) => {
    if (date) onChange(date);
  };

  const open = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: value ?? new Date(),
        mode: "date",
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
    fontSize: 14,
    fontWeight: "600",
    color: Palette.textButtonSecondary,
    marginBottom: 8,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputError: { borderColor: Palette.danger },
  value: { fontSize: 16, color: Palette.text },
  placeholder: { fontSize: 16, color: Palette.icon },
  errorText: { marginTop: 6, fontSize: 13, color: Palette.danger },
  iosPicker: {
    marginTop: 8,
    backgroundColor: Palette.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.border,
    overflow: "hidden",
  },
});
