import ContinueStudyCard from "@/components/home/ContinueStudyCard";
import CourseCard from "@/components/CourseCard";
import CustomHeader from "@/components/CustomHeader";
import { HOME_SECTIONS, LAST_STUDY } from "@/constants/home";
import { Palette } from "@/constants/palette";
import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader
        title="Vitaj späť"
        description="Pokračuj tam, kde si skončil."
        onNotificationPress={() => console.log("Klik na notifikácie")}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ContinueStudyCard
          progress={LAST_STUDY}
          onPress={() => console.log("Pokračovať v štúdiu")}
        />

        {HOME_SECTIONS.map((section) => (
          <CourseCard
            key={section.id}
            icon={section.icon}
            title={section.title}
            description={section.description}
            onPress={() =>
              section.href
                ? router.push(section.href)
                : console.log(`Klik na ${section.title}`)
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
