import { Provider } from "react-redux";
import { store } from "@/store";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Button,
} from "react-native-paper";

import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  useTheme,
} from "@react-navigation/native";

import { Stack } from "expo-router";
import { Slot } from "expo-router";

import { adaptNavigationTheme } from "react-native-paper";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
