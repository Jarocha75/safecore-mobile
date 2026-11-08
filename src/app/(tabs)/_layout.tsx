import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";
import type { ComponentProps } from "react";

import { Palette } from "@/constants/palette";
import { Font } from "@/constants/typography";

type IconName = ComponentProps<typeof Ionicons>["name"];

/** Aktívna záložka má plnú ikonu, neaktívna obrysovú. */
function tabIcon(active: IconName, inactive: IconName) {
  return function TabIcon({
    color,
    size,
    focused,
  }: {
    color: ColorValue;
    size: number;
    focused: boolean;
  }) {
    return (
      <Ionicons name={focused ? active : inactive} size={size} color={color as string} />
    );
  };
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Palette.primary,
        tabBarInactiveTintColor: Palette.icon,
        tabBarLabelStyle: { fontFamily: Font.bodyMedium, fontSize: 12 },
        tabBarStyle: {
          backgroundColor: Palette.surface,
          borderTopWidth: 0,
          elevation: 0,
        },
        sceneStyle: { backgroundColor: Palette.background },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Domov", tabBarIcon: tabIcon("home", "home-outline") }}
      />
      <Tabs.Screen
        name="tests"
        options={{
          title: "Testy",
          tabBarIcon: tabIcon("help-circle", "help-circle-outline"),
        }}
      />
      <Tabs.Screen
        name="license"
        options={{ title: "Preukaz", tabBarIcon: tabIcon("card", "card-outline") }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: tabIcon("person", "person-outline"),
        }}
      />
    </Tabs>
  );
}
