import { useAppDispatch } from "@/lib/hooks";
import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { GestureResponderEvent, View } from "react-native";
import { Button, Text, TextInput, Title } from "react-native-paper";
import { addTodo, type Todo } from "./todosSlice";

export const AddTodoForm = () => {
  const [inputTitle, setInputTitle] = React.useState("");
  const [inputDesc, setInputDesc] = React.useState("");

  // Get the `dispatch` method from the store
  const dispatch = useAppDispatch();

  const handleSubmit = (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    // Create the post object and dispatch the `postAdded` action
    const newTodo: Todo = {
      id: nanoid(),
      title: inputTitle,
      desc: inputDesc,
    };

    console.log("Values: ", { inputTitle, inputDesc });
    dispatch(addTodo(newTodo));
  };

  return (
    <View>
      <Title>Add a New Todo</Title>

      <TextInput
        label="Todo Title:"
        value={inputTitle}
        onChangeText={(text) => setInputTitle(text)}
      />

      <TextInput
        label="Todo Description:"
        value={inputDesc}
        onChangeText={(text) => setInputDesc(text)}
      />

      <Button
        style={{ marginTop: 15 }}
        icon="send"
        mode="contained"
        onPress={handleSubmit}
      >
        Save todo
      </Button>
    </View>
  );
};
