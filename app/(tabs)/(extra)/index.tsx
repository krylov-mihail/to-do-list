import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import { View } from "react-native";
import { Button, List } from "react-native-paper";

export default function Page() {
  return (
    <View>
      <Text>Overview page</Text>

      <Link href="/settings" asChild>
        <List.Item
          title="Setting"
          description="App configuration"
          left={(props) => <List.Icon {...props} icon="cogs" />}
        />
      </Link>
      <Link href="/projects" asChild>
        <List.Item
          title="Project"
          description="Manage your projects"
          left={(props) => <List.Icon {...props} icon="folder" />}
        />
      </Link>
      <Link href="/achivements" asChild>
        <List.Item
          title="Achievements"
          description="View your results"
          left={(props) => <List.Icon {...props} icon="trophy" />}
        />
      </Link>
    </View>
  );
}
