import React, { ReactNode } from "react";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { todoUpdated } from "./todosSlice";
import { GestureResponderEvent, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { router } from "expo-router";

// omit form element types

type EditTodoForm = {
  slug: string | string[] | undefined;
  children?: ReactNode;
};

export const EditTodoForm = (props: EditTodoForm) => {
  const todoItem = useAppSelector((state) =>
    state.todos.todos.find((todo) => todo.id === props.slug)
  );

  const dispatch = useAppDispatch();

  if (!todoItem) {
    return (
      <View>
        <Title>Todo not found!</Title>
      </View>
    );
  }
  const [inputTitle, setInputTitle] = React.useState(todoItem.title);
  const [inputDesc, setInputDesc] = React.useState(todoItem.desc);

  const handleSubmit = (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    if (inputTitle && inputDesc) {
      dispatch(
        todoUpdated({ id: todoItem.id, title: inputTitle, desc: inputDesc })
      );

      router.back();
    }
  };

  return (
    <View>
      <Title>Edit the Todo</Title>

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
