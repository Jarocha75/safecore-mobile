import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { CardStyles } from "@/constants/card-styles";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";
import type { TipSection } from "@/types/tips";

type TipSectionCardProps = {
  section: TipSection;
  /** Poradie sekcie v téme (od 1). */
  index: number;
  onPress: () => void;
};

/** Karta sekcie v téme: číslo, názov a krátky popis. */
export default function TipSectionCard({
  section,
  index,
  onPress,
}: TipSectionCardProps) {
  return (
    <PressableScale
      style={CardStyles.listCard}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${section.title}. ${section.description}`}
    >
      <View style={CardStyles.iconBox}>
        <Text style={styles.number}>{index}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{section.title}</Text>
        <Text style={styles.description}>{section.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  number: {
    fontFamily: Font.displayBold,
    fontSize: 24,
    color: Palette.primary,
  },
  body: { flex: 1 },
  title: {
    fontFamily: Font.bodySemiBold,
    fontSize: 18,
    color: Palette.text,
    marginBottom: 2,
  },
  description: {
    fontFamily: Font.body,
    fontSize: 15,
    lineHeight: 20,
    color: Palette.textSecondary,
  },
});
