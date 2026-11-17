import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";

type ConsentCheckboxProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  error?: string;
  /** Voliteľný odkaz pod textom (napr. na zásady ochrany osobných údajov). */
  linkLabel?: string;
  onLinkPress?: () => void;
};

/** Zaškrtávacie pole so súhlasom (text je celý klikateľný). */
export default function ConsentCheckbox({
  value,
  onChange,
  label,
  error,
  linkLabel,
  onLinkPress,
}: ConsentCheckboxProps) {
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.row}
        onPress={() => onChange(!value)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: value }}
        accessibilityLabel={label}
      >
        <View style={[styles.box, value && styles.boxChecked, error ? styles.boxError : null]}>
          {value ? (
            <Ionicons name="checkmark" size={18} color={Palette.onPrimary} />
          ) : null}
        </View>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
      {linkLabel && onLinkPress ? (
        <Pressable
          onPress={onLinkPress}
          style={styles.link}
          accessibilityRole="link"
          accessibilityLabel={linkLabel}
        >
          <Text style={styles.linkText}>{linkLabel}</Text>
        </Pressable>
      ) : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 18 },
  row: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  box: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  boxChecked: { backgroundColor: Palette.primary, borderColor: Palette.primary },
  boxError: { borderColor: Palette.danger },
  label: {
    flex: 1,
    fontFamily: Font.body,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.textSecondary,
  },
  link: { marginTop: 8, marginLeft: 36, alignSelf: "flex-start" },
  linkText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 14,
    color: Palette.primary,
    textDecorationLine: "underline",
  },
  errorText: { marginTop: 6, fontFamily: Font.body, fontSize: 14, color: Palette.danger },
});
