import { SafeAreaView, Text, StyleSheet, View, ScrollView } from "react-native";
import * as React from "react";

import { selectUser } from "@/lib/features/user/userSlice";

import { useSelector } from "react-redux";

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
