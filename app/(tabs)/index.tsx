import { SafeAreaView, Text, StyleSheet } from "react-native";
import { TodosList } from "@/lib/features/todos/todosList";

import * as React from "react";

import { selectUser, getLoadState } from "@/lib/features/user/userSlice";

import { useSelector, useDispatch } from "react-redux";

import { FABButton } from "@/components/FABButton";

export default function Index() {
  let dataLoaded = useSelector(getLoadState);
  let currentUser = useSelector(selectUser);

  const dispatch = useDispatch();
  const curDate = new Date().toISOString().slice(0, 10);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome {currentUser.user.email}</Text>
      <TodosList renderDate={curDate} />

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
