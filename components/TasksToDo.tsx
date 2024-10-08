import { Todo, ToDoStatusType } from "@/lib/features/todos/todosSlice";
import { Link } from "expo-router";
import {
  Checkbox,
  IconButton,
  List,
  RadioButton,
  Text,
  Button,
} from "react-native-paper";

type PropsType = {
  tasks: Array<Todo>;
  status: ToDoStatusType | "overdue";
  multimode: string;
  checkedArr: Array<string>;
  setCheckedArr: (arr: Array<string>) => void;
  updateStatus: (id: string, status: ToDoStatusType) => void;
};

export const TasksToDo = (props: PropsType) => {
  const { tasks, status, multimode, checkedArr, setCheckedArr, updateStatus } =
    { ...props };

  const renderedTodoList = tasks.map((todo) => (
    <Link key={todo.id} href={`/todo/${todo.id}`} asChild>
      <List.Item
        title={(props) => {
          return (
            <Text
              {...props}
              style={{
                textDecorationLine:
                  status == "completed" ? "line-through" : "none",
              }}
            >
              {todo.title}
            </Text>
          );
        }}
        description={todo.desc.substring(0, 100)}
        left={(props) => {
          if (status == "overdue") {
            return (
              <Link href={`/todo/overdue?slug=${todo.id}`} asChild>
                <IconButton
                  {...props}
                  icon="clock-edit-outline"
                  mode="contained"
                />
              </Link>
            );
          }

          return multimode == "checked" ? (
            <Checkbox
              {...props}
              status={checkedArr.includes(todo.id) ? "checked" : "unchecked"}
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
        right={(props) => {
          if (status == "overdue") {
            return (
              <Link href={`/todo/overdue?slug=${todo.id}`} asChild>
                <Button {...props} compact={true} mode="contained">
                  Handle
                </Button>
              </Link>
            );
          } else {
            return (
              <Link href={`/todo/${todo.id}`} asChild>
                <IconButton
                  {...props}
                  icon="arrow-right-circle"
                  mode="contained"
                />
              </Link>
            );
          }
        }}
      />
    </Link>
  ));

  return <>{renderedTodoList}</>;
};
