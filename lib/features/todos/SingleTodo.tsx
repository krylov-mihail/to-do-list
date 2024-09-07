import { useAppSelector } from "@/lib/hooks";
import { router } from "expo-router";
import { ComponentProps, JSX, ReactNode, RefAttributes } from "react";
import {
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
  StyleSheet,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Text,
  AvatarIconProps,
  Title,
  Chip,
} from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { selectTodoById } from "./todosSlice";
import { selectProjectById } from "../projects/projectsSlice";
import { TimeSpan } from "@/components/TimeSpan";

type SingleTodoProps = {
  slug: string | undefined;
  children?: ReactNode;
};

const LeftContent = (props: { size: number }) => (
  <Avatar.Icon {...props} icon="folder" />
);

export const SingleTodo = (props: SingleTodoProps) => {
  const todoItem = useAppSelector((state) =>
    selectTodoById(state, props.slug!)
  );

  if (!todoItem) {
    return (
      <View>
        <Title>Todo not found!</Title>
      </View>
    );
  }
  const project = useAppSelector((state) =>
    selectProjectById(state, todoItem.projectId)
  );

  return (
    <Card style={{ width: "90%" }}>
      <Card.Title
        title={todoItem.title}
        subtitle={<TimeSpan timestamp={todoItem.deadline} />}
        left={LeftContent}
      />
      <Card.Content>
        <Chip icon="folder">Project: {project?.title}</Chip>

        <Text variant="bodyMedium">{todoItem.desc}</Text>
      </Card.Content>

      <Card.Actions>
        <Button
          onPress={() => {
            router.push(`todo/edittodo?slug=${todoItem.id}`);
          }}
        >
          Edit
        </Button>
        <Button onPress={router.back}>Back to list</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    margin: 0,
  },
});
