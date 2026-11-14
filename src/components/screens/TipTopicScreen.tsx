import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TipSectionCard from "@/components/tips/TipSectionCard";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { Palette } from "@/constants/palette";
import { TIP_TOPICS } from "@/constants/tips";
import { Font } from "@/constants/typography";

/** Téma v Radách a tipoch: karty jej sekcií. */
export default function TipTopicScreen() {
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
          topic.sections.map((section, index) => (
            <TipSectionCard
              key={section.id}
              section={section}
              index={index + 1}
              onPress={() =>
                router.push({
                  pathname: "/tips/[id]/[sectionId]",
                  params: { id: topic.id, sectionId: section.id },
                })
              }
            />
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
  empty: {
    fontFamily: Font.body,
    fontSize: 16,
    color: Palette.textSecondary,
    textAlign: "center",
    marginTop: 40,
  },
});
