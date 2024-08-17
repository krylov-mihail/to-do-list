import { Link, router, useLocalSearchParams } from "expo-router";
import { Platform, Text, View } from "react-native";
import { SingleTodo } from "@/lib/features/todos/SingleTodo";
import { StatusBar } from "expo-status-bar";

export default function TodoPage() {
  const isPresented = router.canGoBack();
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SingleTodo slug={slug}></SingleTodo>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS. Set the status bar to light content and add a fallback for other platforms with auto. */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
