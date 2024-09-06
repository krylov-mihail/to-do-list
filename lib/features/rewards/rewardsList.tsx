import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { GestureResponderEvent, View } from "react-native";

import { List, Title, useTheme } from "react-native-paper";
import { AddRewardForm } from "./AddRewardForm";

export const RewardsList = () => {
  const rewards = useAppSelector((state: RootState) => state.rewards.rewards);
  const theme = useTheme();

  const renderedRewardsList = rewards.map((reward) => (
    <List.Item
      key={reward.id}
      title={reward.title}
      description={reward.desc.substring(0, 100)}
      left={() => <List.Icon icon="trophy" />}
      onPress={(e: GestureResponderEvent) => {
        console.log("pressed");
      }}
    />
  ));

  return (
    <View>
      {rewards.length > 0 && <Title>Your Rewards</Title>}
      <List.Section>{renderedRewardsList}</List.Section>
      <AddRewardForm />
    </View>
  );
};
