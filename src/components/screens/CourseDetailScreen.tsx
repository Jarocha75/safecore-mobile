import PressableScale from "@/components/ui/PressableScale";
import ScreenTopBar from "@/components/ui/ScreenTopBar";
import { COURSE_DETAILS, DURATION_LABELS } from "@/constants/course-details";
import { Palette } from "@/constants/palette";
import { PREP_COURSES } from "@/constants/prep-courses";
import { Font } from "@/constants/typography";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CourseDetailScreenProps = {
  courseId: string;
};

export default function CourseDetailScreen({
  courseId,
}: CourseDetailScreenProps) {
  const course = PREP_COURSES.find((c) => c.id === courseId);
  const detail = COURSE_DETAILS[courseId];
  const unit = detail ? DURATION_LABELS[detail.durationUnit] : null;
  const total = detail?.subjects.reduce((sum, s) => sum + s.amount, 0) ?? 0;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenTopBar title={course?.title ?? "Kurz"} />

      {!course || !detail ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Obsah kurzu pripravujeme.</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.plate}>
              <Text style={styles.letter}>{course.badge}</Text>
            </View>
            <Text style={styles.subtitle}>{course.subtitle}</Text>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{detail.subjects.length}</Text>
              <Text style={styles.statLabel}>predmetov</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{total}</Text>
              <Text style={styles.statLabel}>{unit?.total}</Text>
            </View>
          </View>

          <View style={styles.lawRow}>
            <Ionicons name="scale-outline" size={20} color={Palette.primary} />
            <Text style={styles.lawText}>{detail.lawReference}</Text>
          </View>

          <Text style={styles.sectionTitle}>Osnova odbornej prípravy</Text>
          <View style={styles.subjectGroup}>
            {detail.subjects.map((subject, index) => (
              <View
                key={subject.letter}
                style={[
                  styles.subjectRow,
                  index > 0 && styles.subjectRowDivider,
                ]}
                accessible
                accessibilityLabel={`${subject.letter}. ${subject.title}, ${subject.amount} ${unit?.short}`}
              >
                <Text style={styles.subjectLetter}>{subject.letter}</Text>
                <Text style={styles.subjectTitle}>{subject.title}</Text>
                <Text style={styles.duration}>
                  {subject.amount} {unit?.short}
                </Text>
              </View>
            ))}
          </View>

          {detail.note ? <Text style={styles.note}>{detail.note}</Text> : null}

          <View style={styles.cta}>
            <Text style={styles.ctaTitle}>Pripravený začať štúdium?</Text>
            <Text style={styles.ctaText}>
              Kurz si zakúpiš na našom webe. Po zakúpení dostaneš email s
              odkazom na aktiváciu účtu.
            </Text>
            <PressableScale
              style={styles.ctaButton}
              onPress={() => {
                WebBrowser.openBrowserAsync(detail.webUrl).catch(() => {
                  Alert.alert(
                    "Stránku sa nepodarilo otvoriť",
                    "Skús to prosím znova alebo navštív safecore.sk v prehliadači.",
                  );
                });
              }}
              accessibilityRole="link"
              accessibilityLabel="Pokračovať na safecore.sk"
              accessibilityHint="Otvorí webovú stránku, kde si kurz zakúpiš"
            >
              <Text style={styles.ctaButtonText}>Pokračovať na safecore.sk</Text>
              <Ionicons
                name="open-outline"
                size={18}
                color={Palette.onPrimary}
              />
            </PressableScale>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: {
    fontFamily: Font.body,
    fontSize: 16,
    color: Palette.textSecondary,
  },
  hero: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 16,
    marginBottom: 16,
  },
  plate: {
    width: 104,
    height: 104,
    borderRadius: 20,
    backgroundColor: Palette.surfaceRaised,
    borderLeftWidth: 4,
    borderLeftColor: Palette.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    fontFamily: Font.displayBold,
    fontSize: 80,
    lineHeight: 88,
    color: Palette.textButtonSecondary,
  },
  subtitle: {
    flex: 1,
    alignSelf: "center",
    fontFamily: Font.bodyMedium,
    fontSize: 16,
    lineHeight: 22,
    color: Palette.primary,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: Palette.surface,
    borderRadius: 18,
    paddingVertical: 18,
    marginBottom: 12,
  },
  stat: { flex: 1, alignItems: "center", paddingHorizontal: 8 },
  statDivider: { width: 1, backgroundColor: Palette.border },
  statValue: {
    fontFamily: Font.displayBold,
    fontSize: 34,
    lineHeight: 38,
    color: Palette.text,
  },
  statLabel: {
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.textSecondary,
    textAlign: "center",
  },
  lawRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 4,
    marginBottom: 28,
  },
  lawText: {
    flex: 1,
    fontFamily: Font.body,
    fontSize: 15,
    lineHeight: 21,
    color: Palette.textSecondary,
  },
  sectionTitle: {
    fontFamily: Font.displayBold,
    fontSize: 22,
    color: Palette.text,
    marginBottom: 12,
  },
  subjectGroup: {
    backgroundColor: Palette.surface,
    borderRadius: 18,
    overflow: "hidden",
  },
  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  subjectRowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Palette.border,
  },
  subjectLetter: {
    width: 22,
    fontFamily: Font.displayBold,
    fontSize: 22,
    color: Palette.primary,
  },
  subjectTitle: {
    flex: 1,
    fontFamily: Font.body,
    fontSize: 16,
    lineHeight: 21,
    color: Palette.text,
  },
  duration: {
    fontFamily: Font.bodyMedium,
    fontSize: 14,
    color: Palette.textSecondary,
  },
  note: {
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.textSecondary,
    lineHeight: 20,
    marginTop: 12,
  },
  cta: {
    marginTop: 28,
    backgroundColor: Palette.surfaceRaised,
    borderRadius: 22,
    padding: 20,
  },
  ctaTitle: {
    fontFamily: Font.displayBold,
    fontSize: 22,
    color: Palette.text,
    marginBottom: 6,
  },
  ctaText: {
    fontFamily: Font.body,
    fontSize: 15,
    color: Palette.textButtonSecondary,
    lineHeight: 21,
    marginBottom: 16,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Palette.primary,
    borderRadius: 14,
    height: 52,
  },
  ctaButtonText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 17,
    color: Palette.onPrimary,
  },
});
