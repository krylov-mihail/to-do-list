import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { View, StyleSheet, SafeAreaView } from "react-native";

import { FAB, List, MD3Colors, RadioButton } from "react-native-paper";
import { AddTodoForm } from "./AddTodoForm";
import { Link } from "expo-router";
import { selectAllTodos, todoStatusUpdated } from "./todosSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export const TodosList = () => {
  const todos = useAppSelector(selectAllTodos);
  const dispatch = useDispatch();

  const updateStatus = (todoId: string, status: string) => {
    console.log("update status", { todoId, status });

    dispatch(todoStatusUpdated({ todoId, status }));
  };
  /**/
  const renderedTodoList = todos.todos.map((todo) => (
    <Link key={todo.id} href={`/todo/${todo.id}`} asChild>
      <List.Item
        key={todo.id}
        title={todo.title}
        description={todo.desc.substring(0, 100)}
        right={() => (
          <RadioButton
            value={todo.id}
            status={todo.status == "completed" ? "checked" : "unchecked"}
            onPress={() =>
              updateStatus(
                todo.id,
                todo.status == "completed" ? "new" : "completed"
              )
            }
          />
        )}
      />
    </Link>
  ));

  return (
    <SafeAreaView>
      <View>
        <List.Section>
          <List.Subheader>Todos</List.Subheader>
          {renderedTodoList}
        </List.Section>
      </View>
    </SafeAreaView>
  );
};
