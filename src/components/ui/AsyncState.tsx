import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import PressableScale from "@/components/ui/PressableScale";
import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";

type AsyncStateProps = {
  loading?: boolean;
  /** Chybová hláška; zobrazí sa s tlačidlom „Skúsiť znova“. */
  error?: string | null;
  onRetry?: () => void;
  /** Text, keď nie je čo zobraziť (bez načítavania a chyby). */
  emptyText?: string;
};

/** Spoločný stav načítavania, chyby alebo prázdneho zoznamu. */
export default function AsyncState({
  loading,
  error,
  onRetry,
  emptyText,
}: AsyncStateProps) {
  if (loading) {
    return (
      <View style={styles.container} accessibilityLiveRegion="polite">
        <ActivityIndicator color={Palette.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text} accessibilityRole={error ? "alert" : undefined}>
        {error ?? emptyText}
      </Text>
      {error && onRetry ? (
        <PressableScale
          style={styles.retry}
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel="Skúsiť znova"
        >
          <Text style={styles.retryText}>Skúsiť znova</Text>
        </PressableScale>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  text: {
    fontFamily: Font.body,
    fontSize: 16,
    lineHeight: 23,
    color: Palette.textSecondary,
    textAlign: "center",
  },
  retry: {
    backgroundColor: Palette.surfaceRaised,
    borderRadius: 14,
    paddingHorizontal: 24,
    height: 48,
    justifyContent: "center",
  },
  retryText: {
    fontFamily: Font.bodySemiBold,
    fontSize: 16,
    color: Palette.primary,
  },
});
