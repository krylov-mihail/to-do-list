import React, { ReactNode } from "react";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { selectTodoById, todoUpdated } from "./todosSlice";
import { GestureResponderEvent, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { router } from "expo-router";
import { Dropdown } from "react-native-paper-dropdown";
import { selectAllProjects } from "../projects/projectsSlice";
import { DatePickerInput } from "react-native-paper-dates";

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
  const [inputDeadline, setInputDeadline] = React.useState(
    new Date(todoItem.deadline)
  );

  const projects = useAppSelector((state) => selectAllProjects(state));

  const handleSubmit = (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    if (inputTitle && inputDesc) {
      dispatch(
        todoUpdated({
          id: todoItem.id,
          title: inputTitle,
          desc: inputDesc,
          projectId: inputProject,
          deadline: inputDeadline.toISOString(),
          status: todoItem.status as "new" | "completed",
        })
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
  );
};
