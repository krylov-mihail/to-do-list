import { Todo } from "@/lib/features/todos/todosSlice";
import { View } from "react-native";
import { Title } from "react-native-paper";

type PropsType = {
  tasks: Array<Todo>;
};

export const OverdueTasks = (props: PropsType) => {
  const { tasks } = { ...props };

  return (
    <View>
      <Title>Overdue Tasks</Title>
    </View>
  );
};
