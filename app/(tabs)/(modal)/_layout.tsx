import { Link, Stack } from "expo-router";
import { Button } from "react-native-paper";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "How-to",
          headerShown: true,
          presentation: "transparentModal",
          headerTitle: () => {
            return (
              <Link href={"/"} asChild>
                <Button icon="close"> Close</Button>
              </Link>
            );
          },
        }}
      />
    </Stack>
  );
}
