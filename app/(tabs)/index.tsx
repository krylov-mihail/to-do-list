import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { TodosList } from "@/lib/features/todos/todosList";

import * as React from "react";

import { selectUser } from "@/lib/features/user/userSlice";

import { useSelector } from "react-redux";

import { FABButton } from "@/components/FABButton";

export default function Index() {
  let currentUser = useSelector(selectUser);

  const curDate = new Date().toISOString().slice(0, 10);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TodosList renderDate={curDate} />
      </ScrollView>
      <FABButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
