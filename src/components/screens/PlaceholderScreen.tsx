import { Palette } from "@/constants/palette";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

export default function PlaceholderScreen({ icon, title, description }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={40} color={Palette.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Palette.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    color: Palette.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    color: Palette.textSecondary,
    fontSize: 15,
    textAlign: "center",
  },
});
