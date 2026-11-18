import CustomHeader from "@/components/CustomHeader";
import ProfileMenuGroup from "@/components/profile/ProfileMenuGroup";
import { Palette } from "@/constants/palette";
import { ABOUT_MENU, SETTINGS_MENU } from "@/constants/profile";
import { useSession } from "@/context/SessionContext";
import { Font } from "@/constants/typography";
import { ApiPath } from "@/constants/api";
import { ApiError, apiFetch } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { session, signOut } = useSession();
  const user = session?.user;
  const courseTitles = session?.courses.map((c) => c.title).join(", ");

  const confirmSignOut = () => {
    Alert.alert("Odhlásiť sa", "Naozaj sa chceš odhlásiť?", [
      { text: "Zrušiť", style: "cancel" },
      { text: "Odhlásiť sa", style: "destructive", onPress: () => void signOut() },
    ]);
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteAccount = async () => {
    if (!session || isDeleting) return;
    setIsDeleting(true);
    try {
      await apiFetch<{ ok: true }>(ApiPath.account, {
        method: "DELETE",
        token: session.token,
      });
      await signOut();
    } catch (error) {
      Alert.alert(
        "Účet sa nepodarilo zmazať",
        error instanceof ApiError
          ? error.message
          : "Skús to prosím znova alebo nás kontaktuj cez safecore.sk.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Zmazať účet",
      "Účet a osobné údaje spojené s appkou sa nenávratne zmažú, vrátane postupu v testoch a SMS upozornení. Účet na webe a prístup ku kurzu zaniknú tiež.",
      [
        { text: "Zrušiť", style: "cancel" },
        {
          text: "Pokračovať",
          style: "destructive",
          onPress: () =>
            Alert.alert("Naozaj zmazať účet?", "Túto akciu nie je možné vrátiť späť.", [
              { text: "Zrušiť", style: "cancel" },
              { text: "Zmazať účet", style: "destructive", onPress: () => void deleteAccount() },
            ]),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader
        title="Môj Profil"
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
            <Text style={styles.userName}>{user?.name ?? user?.email}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            {courseTitles ? (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{courseTitles}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Nastavenia a aplikácia</Text>
        <ProfileMenuGroup items={SETTINGS_MENU} />

        <Text style={styles.sectionTitle}>O aplikácii</Text>
        <ProfileMenuGroup items={ABOUT_MENU} />

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={confirmSignOut}
          accessibilityRole="button"
          accessibilityLabel="Odhlásiť sa"
        >
          <Ionicons name="log-out-outline" size={20} color={Palette.danger} />
          <Text style={styles.logoutText}>Odhlásiť sa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={confirmDeleteAccount}
          disabled={isDeleting}
          accessibilityRole="button"
          accessibilityLabel="Zmazať účet"
          accessibilityState={{ disabled: isDeleting, busy: isDeleting }}
        >
          {isDeleting ? (
            <ActivityIndicator color={Palette.danger} />
          ) : (
            <Text style={styles.deleteText}>Zmazať účet</Text>
          )}
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
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    marginTop: 12,
  },
  deleteText: {
    fontFamily: Font.body,
    fontSize: 15,
    color: Palette.textSecondary,
    textDecorationLine: "underline",
  },
});
