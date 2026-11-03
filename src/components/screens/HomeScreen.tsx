import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Vitacia hlavička */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Vitaj v SafeCore 👋</Text>
        <Text style={styles.subtitleText}>
          Tvoja profesionálna príprava na skúšky
        </Text>
      </View>

      {/* Karta kurzu: Zbrojný preukaz */}
      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark" size={28} color="#3b82f6" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Zbrojný preukaz</Text>
          <Text style={styles.cardDescription}>
            Skupiny A, B, C, D, E – Testy a legislatíva
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
      </TouchableOpacity>

      {/* Karta kurzu: SBS Typ S */}
      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <View style={styles.iconContainer}>
          <Ionicons name="lock-closed" size={28} color="#3b82f6" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>SBS – Preukaz Typ S</Text>
          <Text style={styles.cardDescription}>
            Strážna služba a odborná príprava
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
      </TouchableOpacity>

      {/* Karta kurzu: SBS Typ P */}
      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <View style={styles.iconContainer}>
          <Ionicons name="business" size={28} color="#3b82f6" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>SBS – Preukaz Typ P</Text>
          <Text style={styles.cardDescription}>
            Fyzická ochrana a detektívna služba
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // Tmavé pozadie (slate-900)
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: "#9ca3af", // Sivá (gray-400)
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b", // Svetlejšia tmavá (slate-800)
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(59, 130, 246, 0.1)", // Jemné modré pozadie
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#9ca3af",
  },
});
