import { HowToBlock } from "@/components/Help";
import { Link } from "expo-router";
import { View, Text } from "react-native";
import { Button, IconButton } from "react-native-paper";

export default function HowTo() {
  return (
    <View style={{ flex: 1 }}>
      <HowToBlock></HowToBlock>
    </View>
  );
}
