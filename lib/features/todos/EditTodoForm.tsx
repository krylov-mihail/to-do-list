import React, { ReactNode } from "react";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { selectTodoById, updateTodo } from "./todosSlice";
import {
  GestureResponderEvent,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { router } from "expo-router";
import { Dropdown } from "react-native-paper-dropdown";
import { selectAllProjects } from "../projects/projectsSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";

// omit form element types

type EditTodoForm = {
  slug: string | undefined;
  children?: ReactNode;
};

export const EditTodoForm = (props: EditTodoForm) => {
  const todoItem = useAppSelector((state) =>
    selectTodoById(state, props.slug!)
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
  const [inputProject, setInputProject] = React.useState(todoItem.projectId);

  const projects = useAppSelector((state) => selectAllProjects(state));

  const currentUser = useSelector(selectUser);

  const handleSubmit = (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    if (inputTitle && inputDesc) {
      dispatch(
        updateTodo({
          userId: currentUser.user.uid,
          id: todoItem.id,
          title: inputTitle,
          desc: inputDesc,
          projectId: inputProject,
        })
      );

      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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

        <Dropdown
          label="Project"
          placeholder="Select Project"
          options={projects.map((project) => ({
            label: project.title,
            value: project.id,
          }))}
          value={inputProject}
          onSelect={(text?: string) => {
            setInputProject(text as string);
          }}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
});
