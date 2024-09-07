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
      <Link href="/history" asChild>
        <List.Item
          title="History"
          description="View history"
          left={(props) => <List.Icon {...props} icon="history" />}
        />
      </Link>
      <Link href="/help" asChild>
        <List.Item
          title="Help"
          description="How to page"
          left={(props) => <List.Icon {...props} icon="help-circle-outline" />}
        />
      </Link>
      <Logout></Logout>
    </View>
  );
}
