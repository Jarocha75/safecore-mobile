import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TipBlockView from "@/components/tips/TipBlockView";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { Palette } from "@/constants/palette";
import { TIP_TOPICS } from "@/constants/tips";
import { Font } from "@/constants/typography";

export default function TipDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const topic = TIP_TOPICS.find((t) => t.id === id);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenTopBar title={topic?.title ?? "Rady a tipy"} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {topic && topic.sections.length > 0 ? (
          topic.sections.map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionTitle} accessibilityRole="header">
                {section.title}
              </Text>
              {section.blocks.map((block, index) => (
                <TipBlockView key={index} block={block} />
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.empty}>Obsah pripravujeme.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  section: { marginBottom: 8 },
  sectionTitle: {
    fontFamily: Font.displayBold,
    fontSize: 24,
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
