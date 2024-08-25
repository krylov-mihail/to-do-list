import {
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { TodosList } from "@/lib/features/todos/todosList";

import * as React from "react";
import { auth } from "../../firebase.Config.js";
import { Button, TextInput } from "react-native-paper";

import Logout from "@/components/Logout";

import { selectUser, getLoadState } from "@/lib/features/user/userSlice";

import { useSelector, useDispatch } from "react-redux";

import { FABButton } from "@/components/FABButton";

export default function Index() {
  let dataLoaded = useSelector(getLoadState);
  let currentUser = useSelector(selectUser);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome {currentUser.user.email}</Text>
      <TodosList />

      <Text>End of the page</Text>

      <FABButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
