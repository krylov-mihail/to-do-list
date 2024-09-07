import {
  fetchDataForUser,
  selectDataStatus,
  selectUser,
} from "@/lib/features/user/userSlice";
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
import {
  fetchStatsForUser,
  selectStatsStatus,
} from "@/lib/features/stats/statsSlice";
import {
  fetchRewardsForUser,
  selectRewardsLoadStatus,
} from "@/lib/features/rewards/rewardsSlice";

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
      dispatch(fetchTodosByUser(currentUser.user.uid));
    }
  }, [todosStatus, dispatch]);

  /* 3. Load  Stats from Firestore*/

  const statsStatus = useAppSelector(selectStatsStatus);

  // update todos if loading  status has changes
  useEffect(() => {
    if (todosStatus === "idle") {
      // need to replace with real user id
      dispatch(fetchStatsForUser(currentUser.user.uid));
    }
  }, [statsStatus, dispatch]);

  /* 4.Load Rewards From Fire store*/
  /*monitore loading status as we make a async request behind the scene */
  const rewardsStatus = useAppSelector(selectRewardsLoadStatus);

  // update todos if loading  status has changes
  useEffect(() => {
    if (rewardsStatus === "idle") {
      // need to replace with real user id
      dispatch(fetchRewardsForUser(currentUser.user.uid));
    }
  }, [rewardsStatus, dispatch]);

  /* 5.Load User Data from  Fire store*/
  /*monitore loading status as we make a async request behind the scene */
  const userDataStatus = useAppSelector(selectDataStatus);

  // update todos if loading  status has changes
  useEffect(() => {
    if (userDataStatus === "idle") {
      // need to replace with real user id
      dispatch(fetchDataForUser(currentUser.user.uid));
    }
  }, [userDataStatus, dispatch]);

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
          title: "Task Details",
        }}
      />
      <Stack.Screen
        name="todo/addtodo"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
          title: "Add Todo",
        }}
      />
      <Stack.Screen
        name="todo/edittodo"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
          title: "Edit todo",
        }}
      />
      <Stack.Screen
        name="todo/overdue"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
          title: "Handle overdue task",
        }}
      />
    </Stack>
  );
}
