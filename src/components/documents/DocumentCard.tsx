import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { CardStyles } from "@/constants/card-styles";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { DocumentItem } from "@/types/documents";

type DocumentCardProps = {
  item: DocumentItem;
  /** PDF je stiahnuté v zariadení (otvorí sa aj offline). */
  downloaded?: boolean;
  onPress: () => void;
};

/** Karta dokumentu: ikona, názov, popis a stav (stiahnuté / čoskoro). */
export default function DocumentCard({
  item,
  downloaded = false,
  onPress,
}: DocumentCardProps) {
  const available = item.pdf !== null;

  return (
    <PressableScale
      style={CardStyles.listCard}
      onPress={available ? onPress : undefined}
      accessibilityRole={available ? "link" : "text"}
      accessibilityLabel={`${item.title}. ${item.description}`}
      accessibilityHint={available ? "Otvorí PDF" : undefined}
    >
      <View style={CardStyles.iconBox}>
        <Ionicons name="document-text" size={26} color={Palette.primary} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={[styles.status, !available && styles.statusMuted]}>
          {!available
            ? "PDF čoskoro"
            : downloaded
              ? "Otvoriť PDF (stiahnuté)"
              : "Otvoriť PDF"}
        </Text>
      </View>
      {available ? (
        <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
      ) : null}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1 },
  title: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    color: Palette.text,
    marginBottom: 2,
  },
  description: {
    fontFamily: Font.body,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.textSecondary,
  },
  status: {
    fontFamily: Font.bodySemiBold,
    fontSize: 14,
    color: Palette.primary,
    marginTop: 8,
  },
  statusMuted: { color: Palette.textSecondary },
});
