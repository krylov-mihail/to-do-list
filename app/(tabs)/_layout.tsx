import { router, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";

import { IconButton, Drawer as PaperDrawer, Text } from "react-native-paper";

const SideMenu = () => {
  return (
    <IconButton
      icon="help-circle"
      size={24}
      onPress={() => {
        router.push("/(tabs)/(modal)");
      }}
    />
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerRight: () => <SideMenu />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "By date",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search-sharp" : "search-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Reward",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "trophy-sharp" : "trophy-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(extra)"
        options={{
          title: "Info",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "albums" : "albums-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(modal)"
        options={{
          title: "Help me",
          headerShown: false,
          href: null,
        }}
      />
    </Tabs>
  );
}
