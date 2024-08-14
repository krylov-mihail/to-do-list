import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { GestureResponderEvent, View } from "react-native";

import { List, useTheme } from "react-native-paper";
import { AddPostForm } from "./AddProjectForm";

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
      <List.Section>
        <List.Subheader>Projects</List.Subheader>
        {renderedProjectsList}
      </List.Section>
      <AddPostForm />
    </View>
  );
};
