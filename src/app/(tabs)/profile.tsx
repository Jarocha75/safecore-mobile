import CustomHeader from "@/components/CustomHeader";
import { Font } from "@/constants/typography";
import { Palette } from "@/constants/palette";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Vlastný header */}
      <CustomHeader
        title="Môj Profil"
        onNotificationPress={() => console.log("Notifikácie")}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Karta s informáciami o používateľovi */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={32} color={Palette.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Jaro (SafeCore)</Text>
            <Text style={styles.userEmail}>jarocha75@gmail.com</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Pro členstvo (Aktívne)</Text>
            </View>
          </View>
        </View>

        {/* Sekcia: Nastavenia a aplikácia */}
        <Text style={styles.sectionTitle}>Nastavenia a aplikácia</Text>

        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={Palette.textSecondary}
              />
              <Text style={styles.menuItemText}>Notifikácie</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={Palette.textSecondary}
              />
              <Text style={styles.menuItemText}>Predplatné a platby</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="moon-outline"
                size={20}
                color={Palette.textSecondary}
              />
              <Text style={styles.menuItemText}>Vzhľad (Tmavý režim)</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
          </TouchableOpacity>
        </View>

        {/* Sekcia: Podpora a info */}
        <Text style={styles.sectionTitle}>O aplikácii</Text>

        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color={Palette.textSecondary}
              />
              <Text style={styles.menuItemText}>Podmienky používania</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={Palette.textSecondary}
              />
              <Text style={styles.menuItemText}>O SafeCore (Verzia 1.0.0)</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Palette.icon} />
          </TouchableOpacity>
        </View>

        {/* Tlačidlo odhlásenia (zatiaľ len vizuálne) */}
        <TouchableOpacity style={styles.logoutButton}>
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
  menuGroup: {
    backgroundColor: Palette.surface,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 28,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 52,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Palette.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontFamily: Font.body,
    fontSize: 16,
    color: Palette.textButtonSecondary,
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
