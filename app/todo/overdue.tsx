import { OverdueTodoForm } from "@/lib/features/todos/OverdueTodoForm";
import { useLocalSearchParams } from "expo-router";

export default function HandleOverdueTodoPage() {
  const { slug } = useLocalSearchParams();
  return <OverdueTodoForm slug={slug as string} />;
}
