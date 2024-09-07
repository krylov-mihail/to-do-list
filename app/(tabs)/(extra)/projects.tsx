import { ProjectsList } from "@/lib/features/projects/projectsList";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProjectsList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 8,
  },
});
