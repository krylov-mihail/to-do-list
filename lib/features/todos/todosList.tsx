import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { View, StyleSheet } from "react-native";

import { FAB, List, MD3Colors } from "react-native-paper";
import { AddTodoForm } from "./AddTodoForm";
import { Link } from "expo-router";
import { selectAllTodos } from "./todosSlice";
import { useAppSelector } from "@/lib/hooks";

export const TodosList = () => {
  const todos = useAppSelector(selectAllTodos);

  /**/
  const renderedTodoList = todos.todos.map((todo) => (
    <Link key={todo.id} href={`/todo/${todo.id}`} asChild>
      <List.Item
        key={todo.id}
        title={todo.title}
        description={todo.desc.substring(0, 100)}
        left={() => <List.Icon color={MD3Colors.tertiary70} icon="folder" />}
      />
    </Link>
  ));

  return (
    <View>
      <List.Section>
        <List.Subheader>Todos</List.Subheader>
        {renderedTodoList}
      </List.Section>
    </View>
  );
};
