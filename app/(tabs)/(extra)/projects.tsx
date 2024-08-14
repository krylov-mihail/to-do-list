import { ProjectsList } from "@/lib/features/projects/projectsList";
import { Text } from "react-native";
import { View } from "react-native";

export default function Page() {
  return (
    <View>
      <Text>Second-level page</Text>
      <ProjectsList />
      <Text>Project details modal</Text>
      <Text>Button to add Project</Text>
      <Text>Edit project</Text>
    </View>
  );
}
