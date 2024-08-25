import {
  selectAllTodos,
  updateTodoStatus,
  ToDoStatusType,
} from "@/lib/features/todos/todosSlice";
import { selectUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Text, View } from "react-native";
import { List, RadioButton } from "react-native-paper";
import { useDispatch } from "react-redux";

export default function Page() {
  const todos = useAppSelector(selectAllTodos);
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectUser);

  const updateStatus = (todoId: string, status: ToDoStatusType) => {
    console.log("update status", { todoId, status });

    dispatch(
      updateTodoStatus({
        todoId,
        newStatus: status,
        userId: currentUser.user.uid as string,
      })
    );
  };

  const renderedTodoList = todos.map((todo) => {
    return (
      todo.status == "completed" && (
        <List.Item
          key={todo.id}
          title={todo.title}
          description={todo.desc.substring(0, 100)}
          right={() => (
            <RadioButton
              value={todo.id}
              status={todo.status == "completed" ? "unchecked" : "checked"}
              onPress={() =>
                updateStatus(
                  todo.id,
                  todo.status == "completed" ? "new" : "completed"
                )
              }
            />
          )}
        />
      )
    );
  });

  return (
    <View>
      <List.Section>
        <List.Subheader>Completed Todos</List.Subheader>
        {renderedTodoList}
      </List.Section>
      <View></View>
    </View>
  );
}
