import React from "react";
import { View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { GestureResponderEvent } from "react-native";

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddProjectFormFields extends HTMLFormControlsCollection {
  projectTitle: HTMLInputElement;
  projectDesc: HTMLTextAreaElement;
}
interface AddProjectFormElements extends HTMLFormElement {
  readonly elements: AddProjectFormFields;
}

export const AddPostForm = () => {
  const [inputTitle, setInputTitle] = React.useState("");
  const [inputDesc, setInputDesc] = React.useState("");

  const handleSubmit = (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    console.log("Values: ", { inputTitle, inputDesc });
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
