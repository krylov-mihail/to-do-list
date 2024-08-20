import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { GestureResponderEvent, View } from "react-native";
import { Button, Text, TextInput, Title } from "react-native-paper";
import { todoAdded, type Todo } from "./todosSlice";
import { router } from "expo-router";
import { selectAllProjects } from "../projects/projectsSlice";
import { Dropdown } from "react-native-paper-dropdown";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";

export const AddTodoForm = () => {
  const [inputTitle, setInputTitle] = React.useState("");
  const [inputDesc, setInputDesc] = React.useState("");
  const [inputProject, setInputProject] = React.useState("");

  const [inputDeadline, setInputDeadline] = React.useState(new Date());

  const projects = useAppSelector(selectAllProjects);

  // Get the `dispatch` method from the store
  const dispatch = useAppDispatch();

  const handleSubmit = (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    console.log("Values: ", {
      inputTitle,
      inputDesc,
      inputProject,
      inputDeadline,
    });

    dispatch(
      todoAdded(
        inputTitle,
        inputDesc,
        inputProject,
        inputDeadline.toISOString(),
        "new"
      )
    );
    router.back();
  };

  return (
    <SafeAreaView>
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

        <View style={{ height: 56 }}>
          <DatePickerInput
            locale="en-GB"
            label="Deadline"
            value={inputDeadline}
            onChange={(d) => setInputDeadline(d as Date)}
            inputMode="start"
          />
        </View>
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
