import {
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
} from "@expo-google-fonts/barlow";
import {
  BarlowSemiCondensed_600SemiBold,
  BarlowSemiCondensed_700Bold,
} from "@expo-google-fonts/barlow-semi-condensed";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { Palette } from "@/constants/palette";
import { useSession } from "@/context/SessionContext";

SplashScreen.preventAutoHideAsync();

export default function RootNavigator() {
  const { session, isLoading } = useSession();
  const [loaded, error] = useFonts({
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    BarlowSemiCondensed_600SemiBold,
    BarlowSemiCondensed_700Bold,
  });

  const ready = (loaded || error) && !isLoading;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Palette.background },
      }}
    >
      <Stack.Protected guard={!session}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot-password" />
      </Stack.Protected>

      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="courses/index" />
        <Stack.Screen name="courses/[id]" />
        <Stack.Screen name="course-tests/[courseId]" />
        <Stack.Screen name="quiz/[testId]" />
        <Stack.Screen name="exam-set/[courseId]/[setId]" />
        <Stack.Screen name="firearm-license" />
        <Stack.Screen name="sbs-license" />
      </Stack.Protected>
    </Stack>
  );
}
