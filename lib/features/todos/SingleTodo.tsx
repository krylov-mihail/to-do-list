import { useAppSelector } from "@/lib/hooks";
import { router } from "expo-router";
import { ComponentProps, JSX, ReactNode, RefAttributes } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Text,
  AvatarIconProps,
  Title,
} from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

type SingleTodoProps = {
  slug: string | string[] | undefined;
  children?: ReactNode;
};

const LeftContent = (props: { size: number }) => (
  <Avatar.Icon {...props} icon="folder" />
);

export const SingleTodo = (props: SingleTodoProps) => {
  console.log(props.slug);

  const todoItem = useAppSelector((state) =>
    state.todos.todos.find((todo) => todo.id === props.slug)
  );

  if (!todoItem) {
    return (
      <View>
        <Title>Todo not found!</Title>
      </View>
    );
  }

  return (
    <Card>
      <Card.Title
        title="Todo Title"
        subtitle="Todo Subtitle"
        left={LeftContent}
      />
      <Card.Content>
        <Text variant="titleLarge">{todoItem.title}</Text>
        <Text variant="bodyMedium">{todoItem.desc}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Actions>
        <Button
          onPress={() => {
            router.push(`todo/edittodo?slug=${todoItem.id}`);
          }}
        >
          Edit
        </Button>
        <Button onPress={router.back}>Ok</Button>
      </Card.Actions>
    </Card>
  );
};
