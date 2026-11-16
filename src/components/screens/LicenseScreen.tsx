import CustomHeader from "@/components/CustomHeader";
import PressableScale from "@/components/ui/PressableScale";
import { CardStyles } from "@/constants/card-styles";
import { Font } from "@/constants/typography";
import { Palette } from "@/constants/palette";
import { useLicenseReminders } from "@/hooks/useLicenseReminders";
import { formatIsoDate } from "@/utils/date";
import { LICENSES } from "@/constants/licenses";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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

        {LICENSES.map((license) => {
          const reminder = find(license.kind);
          return (
            <PressableScale
              key={license.id}
              style={CardStyles.listCard}
              onPress={() => router.push(license.href)}
              accessibilityRole="button"
              accessibilityLabel={license.title}
            >
              <View style={CardStyles.iconBox}>{license.icon}</View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{license.title}</Text>
                {reminder ? (
                  <Text style={styles.cardSubtitle}>
                    SMS upozornenie · platnosť do{" "}
                    {formatIsoDate(reminder.validUntil)}
                  </Text>
                ) : null}
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={Palette.icon}
                style={styles.chevron}
              />
            </PressableScale>
          );
        })}
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
  cardText: { flex: 1 },
  cardSubtitle: {
    fontFamily: Font.body,
    fontSize: 13,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  cardTitle: {
    fontFamily: Font.bodySemiBold,
    fontSize: 18,
    color: Palette.text,
  },
  chevron: {
    marginLeft: "auto",
  },
});
