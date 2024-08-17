import React from "react";
import { View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { GestureResponderEvent } from "react-native";

import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/lib/hooks";

import { type Project, addProject } from "./projectsSlice";

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddProjectFormFields extends HTMLFormControlsCollection {
  projectTitle: HTMLInputElement;
  projectDesc: HTMLTextAreaElement;
}
interface AddProjectFormElements extends HTMLFormElement {
  readonly elements: AddProjectFormFields;
}

export const AddProjectForm = () => {
  const [inputTitle, setInputTitle] = React.useState("");
  const [inputDesc, setInputDesc] = React.useState("");

  // Get the `dispatch` method from the store
  const dispatch = useAppDispatch();

  // Create the post object and dispatch the `postAdded` action
  const newProject: Project = {
    id: nanoid(),
    title: inputTitle,
    desc: inputDesc,
  };

  const handleSubmit = (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    console.log("Values: ", { inputTitle, inputDesc });
    dispatch(addProject(newProject));
  };

  return (
    <View>
      <Title>Add a New Project</Title>

      <TextInput
        label="Project Title:"
        value={inputTitle}
        onChangeText={(text) => setInputTitle(text)}
      />

      <TextInput
        label="Project Description:"
        value={inputDesc}
        onChangeText={(text) => setInputDesc(text)}
      />

      <Button
        style={{ marginTop: 15 }}
        icon="send"
        mode="contained"
        onPress={handleSubmit}
      >
        Save project
      </Button>
    </View>
  );
};
