import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TodosList } from "@/lib/features/todos/todosList";

import * as React from "react";
import { auth } from "../../firebase.Config.js";
import { Button, TextInput } from "react-native-paper";

import Login from "@/components/Login";
import Logout from "@/components/Logout";

import { selectUser, getLoadState } from "@/lib/features/user/userSlice";

import { useSelector, useDispatch } from "react-redux";

import { FABButton } from "@/components/FABButton";

import { Link } from "expo-router";

export default function Index() {
  let dataLoaded = useSelector(getLoadState);
  let currentUser = useSelector(selectUser);

  const dispatch = useDispatch();

  if (!currentUser) {
    return <Login></Login>;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text>Welcome {currentUser.user.email}</Text>
      <Logout></Logout>

      <TodosList />

      <Text>End of the page</Text>

      <FABButton />
    </View>
  );
}
