import { StyleSheet, Text, View } from "react-native";

import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { TipBlock } from "@/types/tips";

/** Jeden blok textu rady: odsek alebo odrážkový zoznam. */
export default function TipBlockView({ block }: { block: TipBlock }) {
  if (block.type === "paragraph") {
    return <Text style={styles.paragraph}>{block.text}</Text>;
  }

  return (
    <View style={styles.list}>
      {block.items.map((item) => (
        <View key={item} style={styles.row}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.item}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontFamily: Font.body,
    fontSize: 16,
    lineHeight: 24,
    color: Palette.text,
    marginBottom: 12,
  },
  list: { marginBottom: 12, gap: 8 },
  row: { flexDirection: "row", gap: 10, paddingRight: 4 },
  bullet: {
    fontFamily: Font.bodySemiBold,
    fontSize: 16,
    lineHeight: 24,
    color: Palette.primary,
  },
  item: {
    flex: 1,
    fontFamily: Font.body,
    fontSize: 16,
    lineHeight: 24,
    color: Palette.text,
  },
});
