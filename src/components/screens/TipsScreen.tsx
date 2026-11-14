import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CourseCard from "@/components/CourseCard";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { Palette } from "@/constants/palette";
import { TIP_TOPICS } from "@/constants/tips";

export default function TipsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenTopBar title="Rady a tipy" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {TIP_TOPICS.map((topic) => (
          <CourseCard
            key={topic.id}
            icon={topic.icon}
            title={topic.title}
            description={topic.description}
            onPress={
              topic.sections.length > 0
                ? () =>
                    router.push({
                      pathname: "/tips/[id]",
                      params: { id: topic.id },
                    })
                : undefined
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
});
