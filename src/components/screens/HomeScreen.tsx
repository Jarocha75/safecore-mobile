import ContinueStudyCard from "@/components/home/ContinueStudyCard";
import CourseCard from "@/components/CourseCard";
import CustomHeader from "@/components/CustomHeader";
import { HOME_SECTIONS } from "@/constants/home";
import { Palette } from "@/constants/palette";
import { useSession } from "@/context/SessionContext";
import type { SavedStudy } from "@/types/study";
import { loadStudy } from "@/utils/study-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { session } = useSession();
  const userId = session?.user.id;
  const [study, setStudy] = useState<SavedStudy | null>(null);

  // Po návrate z kvízu sa postup načíta znova.
  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      let cancelled = false;
      loadStudy(userId).then((s) => {
        if (!cancelled) setStudy(s);
      });
      return () => {
        cancelled = true;
      };
    }, [userId]),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader
        title="Vitaj späť"
        description="Pokračuj tam, kde si skončil."
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {study ? (
          <ContinueStudyCard
            progress={study}
            onPress={() =>
              router.push({
                pathname: "/quiz/[testId]",
                params: { testId: study.testId, courseId: study.courseId },
              })
            }
          />
        ) : null}

        {HOME_SECTIONS.map((section) => (
          <CourseCard
            key={section.id}
            icon={section.icon}
            title={section.title}
            description={section.description}
            onPress={
              section.href ? () => router.push(section.href!) : undefined
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
});
