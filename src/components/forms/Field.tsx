import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";

import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";

type FieldProps = TextInputProps & {
  label: string;
  error?: string;
  prefix?: string;
};

/** Textové pole formulára s popiskom, voliteľnou predponou a chybovou hláškou. */
export default function Field({ label, error, prefix, ...inputProps }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
        <TextInput
          accessibilityLabel={label}
          {...inputProps}
          style={styles.inputText}
          placeholderTextColor={Palette.icon}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Palette.surface,
    borderWidth: 1.5,
    borderColor: "transparent",
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  prefix: { fontFamily: Font.body, fontSize: 17, color: Palette.textSecondary, marginRight: 2 },
  inputText: {
    flex: 1,
    paddingVertical: 15,
    fontFamily: Font.body,
    fontSize: 17,
    color: Palette.text,
  },
  inputError: { borderColor: Palette.danger },
  errorText: { marginTop: 6, fontFamily: Font.body, fontSize: 14, color: Palette.danger },
});
