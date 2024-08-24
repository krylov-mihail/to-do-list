import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import {
  Button,
  Checkbox,
  FAB,
  IconButton,
  List,
  ActivityIndicator,
  RadioButton,
  ToggleButton,
  Text,
} from "react-native-paper";

import { Link } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import {
  fetchTodosByUser,
  selectAllTodos,
  selectTodosStatus,
  selectTodosError,
  todoStatusUpdated,
} from "./todosSlice";

export const TodosList = () => {
  /*get todos from Redux*/
  const todos = useAppSelector(selectAllTodos);
  const dispatch = useAppDispatch();

  /*monitore loading status as we make a async request behind the scene */
  const todosStatus = useAppSelector(selectTodosStatus);
  /* in case we fail to fetch data from firebase, we will get error message  */
  const todosError = useAppSelector(selectTodosError);

  // update todos if loading  status has changes
  useEffect(() => {
    if (todosStatus === "idle") {
      // need to replace with real user id
      dispatch(fetchTodosByUser("1"));
    }
  }, [todosStatus, dispatch]);

  // todo status update logic
  const updateStatus = (todoId: string, status: "new" | "completed") => {
    console.log("update status", { todoId, status });

    dispatch(todoStatusUpdated({ todoId, status }));
  };

  /* state variables to manage  bulk task update */
  const [checkedArr, setCheckedArr] = React.useState<string[]>([]);
  const [multiMode, setmultiMode] = React.useState("unchecked");

  const onButtonToggle = () => {
    setmultiMode(multiMode === "checked" ? "unchecked" : "checked");
  };

  var content = null;

  if (todosStatus === "pending") {
    content = <ActivityIndicator />;
  } else if (todosStatus === "succeeded") {
    // Sort todos in reverse chronological order by datetime string
    /* const orderedTodos = todos
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))*/
    /* render todos */
    const renderedTodoList = todos.map(
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
                    status={
                      todo.status == "completed" ? "checked" : "unchecked"
                    }
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
    content = renderedTodoList;
  } else if (todosStatus === "rejected") {
    content = <Text>{todosError}</Text>;
  }

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
        {content}
      </List.Section>
    </View>
  );
};
