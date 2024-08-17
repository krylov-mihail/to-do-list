import { EditTodoForm } from "@/lib/features/todos/EditTodoForm";
import { useLocalSearchParams } from "expo-router";

export default function EditTodoPage() {
  const { slug } = useLocalSearchParams();
  return <EditTodoForm slug={slug as string} />;
}
