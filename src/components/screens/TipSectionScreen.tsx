import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TipBlockView from "@/components/tips/TipBlockView";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { Palette } from "@/constants/palette";
import { TIP_TOPICS } from "@/constants/tips";
import { Font } from "@/constants/typography";

/** Text jednej sekcie rady. */
export default function TipSectionScreen() {
  const { id, sectionId } = useLocalSearchParams<{
    id: string;
    sectionId: string;
  }>();
  const topic = TIP_TOPICS.find((t) => t.id === id);
  const section = topic?.sections.find((s) => s.id === sectionId);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenTopBar title={topic?.title ?? "Rady a tipy"} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {section ? (
          <>
            <Text style={styles.sectionTitle} accessibilityRole="header">
              {section.title}
            </Text>
            {section.blocks.map((block, index) => (
              <TipBlockView key={index} block={block} />
            ))}
          </>
        ) : (
          <Text style={styles.empty}>Obsah sa nenašiel.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  sectionTitle: {
    fontFamily: Font.displayBold,
    fontSize: 26,
    color: Palette.text,
    marginBottom: 14,
  },
  empty: {
    fontFamily: Font.body,
    fontSize: 16,
    color: Palette.textSecondary,
    textAlign: "center",
    marginTop: 40,
  },
});
