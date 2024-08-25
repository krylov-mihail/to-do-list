import { selectUser } from "@/lib/features/user/userSlice";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

import {
  fetchProjectsForUser,
  selectProjectsLoadError,
  selectProjectsLoadStatus,
} from "@/lib/features/projects/projectsSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchTodosByUser,
  selectTodosError,
  selectTodosStatus,
} from "@/lib/features/todos/todosSlice";

export default function MainApp() {
  // user is loaded ata loaded from the storage

  const currentUser = useSelector(selectUser);
  const dispatch = useAppDispatch();
  // load user specific data

  /* 1. Load Projects From Fire store */
  /*monitore loading status as we make a async request behind the scene */
  const projectsLoadStatus = useAppSelector(selectProjectsLoadStatus);
  /* in case we fail to fetch data from firebase, we will get error message  */
  //const projectsLoadError = useAppSelector(selectProjectsLoadError);

  // update todos if loading  status has changes
  useEffect(() => {
    if (projectsLoadStatus === "idle") {
      // need to replace with real user id
      console.log(`MainApp. line 36, current user`, currentUser);
      dispatch(fetchProjectsForUser(currentUser.user.uid));
    }
  }, [projectsLoadStatus, dispatch]);

  /* 2.Load Todos From Fire store*/
  /*monitore loading status as we make a async request behind the scene */
  const todosStatus = useAppSelector(selectTodosStatus);

  // update todos if loading  status has changes
  useEffect(() => {
    if (todosStatus === "idle") {
      // need to replace with real user id
      dispatch(fetchTodosByUser(currentUser.id));
    }
  }, [todosStatus, dispatch]);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="todo/[slug]"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="todo/addtodo"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "containedModal",
        }}
      />
    </Stack>
  );
}
