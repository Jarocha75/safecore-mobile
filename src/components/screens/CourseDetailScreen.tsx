import { COURSE_DETAILS, DURATION_LABELS } from "@/constants/course-details";
import { Palette } from "@/constants/palette";
import { PREP_COURSES } from "@/constants/prep-courses";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
          accessibilityLabel="Späť"
        >
          <Ionicons name="chevron-back" size={22} color={Palette.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle} numberOfLines={1}>
          {course?.title ?? "Kurz"}
        </Text>
        <View style={styles.backButton} />
      </View>

      {!course || !detail ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Obsah kurzu pripravujeme.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.hero}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{course.badge}</Text>
            </View>
            <Text style={styles.subtitle}>{course.subtitle}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{detail.subjects.length}</Text>
              <Text style={styles.statLabel}>predmetov</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{total}</Text>
              <Text style={styles.statLabel}>{unit?.total}</Text>
            </View>
          </View>
          <View style={styles.lawCard}>
            <Ionicons name="scale-outline" size={22} color={Palette.primary} />
            <Text style={styles.lawText}>{detail.lawReference}</Text>
          </View>

          <Text style={styles.sectionTitle}>Osnova odbornej prípravy</Text>
          {detail.subjects.map((subject) => (
            <TouchableOpacity
              key={subject.letter}
              style={styles.subjectCard}
              activeOpacity={0.8}
              onPress={() => console.log(`Klik na predmet ${subject.letter}`)}
              accessibilityRole="button"
              accessibilityLabel={`${subject.letter}. ${subject.title}, ${subject.amount} ${unit?.short}`}
            >
              <View style={styles.subjectBadge}>
                <Text style={styles.subjectBadgeText}>{subject.letter}</Text>
              </View>
              <Text style={styles.subjectTitle}>{subject.title}</Text>
              <View style={styles.durationChip}>
                <Text style={styles.durationText}>
                  {subject.amount} {unit?.short}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {detail.note ? <Text style={styles.note}>{detail.note}</Text> : null}

          <View style={styles.cta}>
            <Text style={styles.ctaTitle}>Pripravený začať štúdium?</Text>
            <Text style={styles.ctaText}>
              Kurz si zakúpite na našom webe. Po zakúpení dostanete email s
              odkazom na aktiváciu účtu.
            </Text>
            <TouchableOpacity
              style={styles.ctaButton}
              activeOpacity={0.85}
              onPress={() => WebBrowser.openBrowserAsync(detail.webUrl)}
              accessibilityRole="button"
            >
              <Text style={styles.ctaButtonText}>
                Pokračovať na safecore.sk
              </Text>
              <Ionicons name="open-outline" size={18} color={Palette.text} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  topTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Palette.text,
  },
  scrollContent: { padding: 20, paddingBottom: 40 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { fontSize: 16, color: Palette.textSecondary },
  hero: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Palette.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontSize: 24, fontWeight: "bold", color: Palette.text },
  subtitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: Palette.primary,
    lineHeight: 20,
  },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  stat: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 12,
    paddingVertical: 16,
  },
  statValue: { fontSize: 26, fontWeight: "bold", color: Palette.text },
  statLabel: {
    fontSize: 13,
    color: Palette.textSecondary,
    marginTop: 2,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  lawCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 28,
  },
  lawText: {
    flex: 1,
    fontSize: 14,
    color: Palette.textSecondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Palette.text,
    marginBottom: 14,
  },
  subjectCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  subjectBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Palette.primaryMuted,
    borderWidth: 1,
    borderColor: Palette.primaryBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  subjectBadgeText: {
    fontSize: 15,
    fontWeight: "bold",
    color: Palette.primary,
  },
  subjectTitle: {
    flex: 1,
    fontSize: 15,
    color: Palette.text,
    lineHeight: 20,
  },
  durationChip: {
    backgroundColor: Palette.primarySoft,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  durationText: { fontSize: 12, fontWeight: "600", color: Palette.primary },
  note: {
    fontSize: 14,
    color: Palette.textSecondary,
    lineHeight: 20,
    marginTop: 4,
  },
  cta: {
    borderTopWidth: 1,
    borderTopColor: Palette.border,
    marginTop: 16,
    paddingTop: 24,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Palette.text,
    marginBottom: 6,
  },
  ctaText: {
    fontSize: 14,
    color: Palette.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Palette.primary,
    borderRadius: 12,
    paddingVertical: 14,
  },
  ctaButtonText: { fontSize: 16, fontWeight: "600", color: Palette.text },
});
