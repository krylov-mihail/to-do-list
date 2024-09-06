import Logout from "@/components/Logout";
import { Link } from "expo-router";
import { Text } from "react-native";
import { View } from "react-native";
import { List } from "react-native-paper";

export default function Page() {
  return (
    <View>
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
      <Link href="/rewards" asChild>
        <List.Item
          title="Rewards"
          description="Manage rewards"
          left={(props) => <List.Icon {...props} icon="trophy" />}
        />
      </Link>
      <Logout></Logout>
    </View>
  );
}
