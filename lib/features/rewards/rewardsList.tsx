import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { GestureResponderEvent, View } from "react-native";

import { Button, Chip, List, Title, useTheme } from "react-native-paper";
import { AddRewardForm } from "./AddRewardForm";
import {
  selectUser,
  selectUserData,
  updatePointsBalance,
} from "../user/userSlice";

export const RewardsList = () => {
  const rewards = useAppSelector((state: RootState) => state.rewards.rewards);
  const theme = useTheme();
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const buyItem = (price: number) => {
    dispatch(
      updatePointsBalance({
        userId: currentUser.user.uid,
        points: userData.points - price,
      })
    );
  };

  const renderedRewardsList = rewards.map((reward) => (
    <List.Item
      key={reward.id}
      title={reward.title}
      description={`${reward.desc.substring(0, 100)}`}
      left={() => (
        <Chip
          icon="trophy"
          onPress={() => console.log("Pressed")}
        >{`${reward.price}`}</Chip>
      )}
      right={() => {
        return (
          <Button
            mode="contained"
            onPress={() => buyItem(reward.price)}
            disabled={reward.price > userData.points}
          >
            {`Buy`}
          </Button>
        );
      }}
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
