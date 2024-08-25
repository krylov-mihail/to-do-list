import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { GestureResponderEvent, View } from "react-native";

import { List, Title, useTheme } from "react-native-paper";
import { AddProjectForm } from "./AddProjectForm";

export const ProjectsList = () => {
  const projects = useAppSelector(
    (state: RootState) => state.projects.projects
  );
  const theme = useTheme();

  const renderedProjectsList = projects.map((project) => (
    <List.Item
      key={project.id}
      title={project.title}
      description={project.desc.substring(0, 100)}
      left={() => <List.Icon icon="folder" />}
      onPress={(e: GestureResponderEvent) => {
        console.log("pressed");
      }}
    />
  ));

  return (
    <View>
      <Title>Your Projects</Title>
      <List.Section>{renderedProjectsList}</List.Section>
      <AddProjectForm />
    </View>
  );
};
