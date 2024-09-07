import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Information",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="help"
        options={{
          title: "How-to",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
