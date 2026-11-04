import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { Palette } from "@/constants/palette";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Palette.primary,
        tabBarInactiveTintColor: Palette.icon,
        tabBarStyle: {
          backgroundColor: Palette.background,
          borderTopColor: Palette.surface,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Domov",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}
