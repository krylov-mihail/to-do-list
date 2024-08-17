import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { GestureResponderEvent, View } from "react-native";
import { Button, Text, TextInput, Title } from "react-native-paper";
import { todoAdded, type Todo } from "./todosSlice";
import { router } from "expo-router";
import { selectAllProjects } from "../projects/projectsSlice";
import { Dropdown } from "react-native-paper-dropdown";

export const AddTodoForm = () => {
  const [inputTitle, setInputTitle] = React.useState("");
  const [inputDesc, setInputDesc] = React.useState("");
  const [inputProject, setInputProject] = React.useState("");

  const projects = useAppSelector(selectAllProjects);

  // Get the `dispatch` method from the store
  const dispatch = useAppDispatch();

  const handleSubmit = (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    console.log("Values: ", { inputTitle, inputDesc, inputProject });
    dispatch(todoAdded(inputTitle, inputDesc, inputProject));
    router.back();
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

      <Dropdown
        label="Project"
        placeholder="Select Project"
        options={projects.map((project) => ({
          label: project.title,
          value: project.id,
        }))}
        value={inputProject}
        onSelect={(text?: string) => {
          console.log(text);
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
  );
};
