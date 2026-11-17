import CustomHeader from "@/components/CustomHeader";
import LicenseCard from "@/components/license/LicenseCard";
import { Font } from "@/constants/typography";
import { Palette } from "@/constants/palette";
import { LICENSES } from "@/constants/licenses";
import { useLicenseReminders } from "@/hooks/useLicenseReminders";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LicenseScreen() {
  const { find } = useLicenseReminders();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader title="Preukaz" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          Tu si môžeš overiť platnosť svojho preukazu a nastaviť upozornenie,
          aby ti neskončila bez povšimnutia. Vyber si typ preukazu.
        </Text>

        {LICENSES.map((license) => (
          <LicenseCard
            key={license.id}
            license={license}
            reminder={find(license.kind)}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  description: {
    fontFamily: Font.body,
    fontSize: 16,
    color: Palette.textSecondary,
    lineHeight: 23,
    marginBottom: 20,
  },
});
