import { StyleSheet, Switch, Text, View } from "react-native";

import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";

type SettingSwitchRowProps = {
  title: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

/** Riadok nastavenia s prepínačom. */
export default function SettingSwitchRow({
  title,
  description,
  value,
  onChange,
}: SettingSwitchRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: Palette.primary, false: Palette.border }}
        accessibilityLabel={title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  texts: { flex: 1 },
  title: { fontFamily: Font.bodySemiBold, fontSize: 16, color: Palette.text },
  description: {
    marginTop: 3,
    fontFamily: Font.body,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.textSecondary,
  },
});
