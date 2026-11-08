import CustomHeader from "@/components/CustomHeader";
import ProfileMenuGroup from "@/components/profile/ProfileMenuGroup";
import { Palette } from "@/constants/palette";
import { ABOUT_MENU, PROFILE_USER, SETTINGS_MENU } from "@/constants/profile";
import { Font } from "@/constants/typography";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader
        title="Môj Profil"
        onNotificationPress={() => console.log("Notifikácie")}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={32} color={Palette.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{PROFILE_USER.name}</Text>
            <Text style={styles.userEmail}>{PROFILE_USER.email}</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{PROFILE_USER.membership}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Nastavenia a aplikácia</Text>
        <ProfileMenuGroup items={SETTINGS_MENU} />

        <Text style={styles.sectionTitle}>O aplikácii</Text>
        <ProfileMenuGroup items={ABOUT_MENU} />

        {/* Odhlásenie sa pripojí po pridaní prihlasovania. */}
        <TouchableOpacity
          style={styles.logoutButton}
          disabled
          accessibilityRole="button"
          accessibilityLabel="Odhlásiť sa"
          accessibilityState={{ disabled: true }}
        >
          <Ionicons name="log-out-outline" size={20} color={Palette.danger} />
          <Text style={styles.logoutText}>Odhlásiť sa</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Palette.surface,
    borderRadius: 22,
    padding: 16,
    marginBottom: 28,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Palette.surfaceRaised,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: Font.displayBold,
    fontSize: 22,
    color: Palette.text,
    marginBottom: 2,
  },
  userEmail: {
    fontFamily: Font.body,
    fontSize: 14,
    color: Palette.textSecondary,
    marginBottom: 8,
  },
  badgeContainer: {
    backgroundColor: Palette.stampSoft,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: Palette.stampBorder,
  },
  badgeText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 13,
    color: Palette.stamp,
  },
  sectionTitle: {
    fontFamily: Font.displayBold,
    fontSize: 20,
    color: Palette.text,
    marginBottom: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Palette.dangerSoft,
    borderRadius: 14,
    height: 52,
  },
  logoutText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 16,
    color: Palette.danger,
  },
});
