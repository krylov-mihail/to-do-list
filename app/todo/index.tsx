import { SafeAreaView, Text, StyleSheet, View, ScrollView } from "react-native";
import { TodosList } from "@/lib/features/todos/todosList";

import * as React from "react";

import { selectUser, getLoadState } from "@/lib/features/user/userSlice";

import { useSelector, useDispatch } from "react-redux";

export default function Index() {
  let currentUser = useSelector(selectUser);

  const curDate = new Date().toISOString().slice(0, 10);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Todo page</Text>
      </ScrollView>
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
