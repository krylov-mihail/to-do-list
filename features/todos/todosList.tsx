import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { View } from "react-native";

import { List, MD3Colors } from "react-native-paper";

export const TodosList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  /*<article className="todo-excerpt" key={todo.id}>
      <h3>{todo.title}</h3>
      <p className="todo-content">{todo.content.substring(0, 100)}</p>
    </article>*/

  const renderedTodoList = todos.map((todo) => (
    <List.Item
      key={todo.id}
      title={todo.title}
      description={todo.content.substring(0, 100)}
      left={() => <List.Icon color={MD3Colors.tertiary70} icon="folder" />}
    />
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
