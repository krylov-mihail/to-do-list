import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";

import {
  Button,
  Checkbox,
  FAB,
  IconButton,
  List,
  MD3Colors,
  RadioButton,
  ToggleButton,
} from "react-native-paper";
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

  const [checkedArr, setCheckedArr] = React.useState<string[]>([]);

  const [multiMode, setmultiMode] = React.useState("unchecked");

  const onButtonToggle = () => {
    setmultiMode(multiMode === "checked" ? "unchecked" : "checked");
  };

  /**/
  const renderedTodoList = todos.todos.map(
    (todo) =>
      todo.status == "new" && (
        <Link key={todo.id} href={`/todo/${todo.id}`} asChild>
          <List.Item
            key={todo.id}
            title={todo.title}
            description={todo.desc.substring(0, 100)}
            left={(props) => {
              return multiMode == "checked" ? (
                <Checkbox
                  {...props}
                  status={
                    checkedArr.includes(todo.id) ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    // if  we already have element in array => remove it
                    // if we do no have it in array => remove it
                    var newArr = checkedArr.includes(todo.id)
                      ? checkedArr.filter((el) => el != todo.id)
                      : [...checkedArr, todo.id];
                    setCheckedArr(newArr);
                  }}
                />
              ) : (
                <RadioButton
                  value={todo.id}
                  status={todo.status == "completed" ? "checked" : "unchecked"}
                  onPress={() => {
                    updateStatus(
                      todo.id,
                      todo.status == "completed" ? "new" : "completed"
                    );
                  }}
                />
              );
            }}
            right={(props) => (
              <Link key={todo.id} href={`/todo/${todo.id}`} asChild>
                <IconButton
                  {...props}
                  icon="arrow-right-circle"
                  mode="contained"
                />
              </Link>
            )}
          />
        </Link>
      )
  );

  return (
    <View>
      <ToggleButton
        icon="checkbox-multiple-outline"
        value="checkbox-multiple-outline"
        status={multiMode as undefined & "checked" & "unchecked"}
        onPress={onButtonToggle}
      />
      <List.Section>
        <List.Subheader>Todos</List.Subheader>
        {renderedTodoList}
      </List.Section>
    </View>
  );
};
