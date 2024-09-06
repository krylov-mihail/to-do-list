import React from "react";
import { View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { GestureResponderEvent } from "react-native";

import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/lib/hooks";

import {
  NewRewardType,
  type RewardType,
  addNewReward,
  addReward,
} from "./rewardsSlice";
import { selectUser } from "../user/userSlice";
import { useSelector } from "react-redux";

export const AddRewardForm = () => {
  const [inputTitle, setInputTitle] = React.useState("");
  const [inputDesc, setInputDesc] = React.useState("");
  const [inputPrice, setInputPrice] = React.useState(10);

  // Get the `dispatch` method from the store
  const dispatch = useAppDispatch();

  let currentUser = useSelector(selectUser);

  // Create the post object and dispatch the `postAdded` action
  const newReward: NewRewardType = {
    title: inputTitle,
    desc: inputDesc,
    price: inputPrice,
    userId: currentUser.user.uid,
  };

  const handleSubmit = async (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    console.log("Add Reward Form 51, Values: ", {
      inputTitle,
      inputDesc,
      inputPrice,
    });
    if (!inputTitle || !inputDesc || !inputPrice) return;

    try {
      await dispatch(addNewReward(newReward));
    } catch (error) {
      console.log("Add Reward Form 50, Error: ", error);
    }

    // clear form

    setInputTitle("");
    setInputDesc("");
  };

  return (
    <View>
      <Title>Add a New Reward</Title>

      <TextInput
        label="Reward Title:"
        value={inputTitle}
        onChangeText={(text) => setInputTitle(text)}
      />

      <TextInput
        label="Reward Description:"
        value={inputDesc}
        onChangeText={(text) => setInputDesc(text)}
      />

      <TextInput
        keyboardType="numeric"
        label="Reward Price:"
        value={inputPrice.toString()}
        onChangeText={(text) => setInputPrice(text as unknown as number)}
      />

      <Button
        style={{ marginTop: 15 }}
        icon="send"
        mode="contained"
        onPress={handleSubmit}
      >
        Save Reward
      </Button>
    </View>
  );
};
