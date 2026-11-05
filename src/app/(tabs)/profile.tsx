import CustomHeader from "@/components//CustomHeader";
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
        subtitle="Správa účtu"
        title="Môj Profil"
        onNotificationPress={() => console.log("Notifikácie")}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Karta s informáciami o používateľovi */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={32} color="#3b82f6" />
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
                color="#9ca3af"
              />
              <Text style={styles.menuItemText}>Notifikácie</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#9ca3af"
              />
              <Text style={styles.menuItemText}>Predplatné a platby</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="moon-outline" size={20} color="#9ca3af" />
              <Text style={styles.menuItemText}>Vzhľad (Tmavý režim)</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6b7280" />
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
                color="#9ca3af"
              />
              <Text style={styles.menuItemText}>Podmienky používania</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#9ca3af"
              />
              <Text style={styles.menuItemText}>O SafeCore (Verzia 1.0.0)</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Tlačidlo odhlásenia (zatiaľ len vizuálne) */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Odhlásiť sa</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // Slate-900
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b", // Slate-800
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3b82f6",
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: "#9ca3af",
    marginBottom: 8,
  },
  badgeContainer: {
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#3b82f6",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  menuGroup: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    overflow: "hidden",
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontSize: 15,
    color: "#e2e8f0",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    borderRadius: 14,
    paddingVertical: 14,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ef4444",
  },
});
