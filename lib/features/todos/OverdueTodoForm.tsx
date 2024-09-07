import React, { ReactNode } from "react";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  addNewTodo,
  selectTodoById,
  updateTodo,
  updateTodoStatus,
} from "./todosSlice";
import {
  GestureResponderEvent,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { Button, TextInput, Title, Text } from "react-native-paper";
import { router } from "expo-router";
import { Dropdown } from "react-native-paper-dropdown";
import { selectAllProjects } from "../projects/projectsSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStats } from "@/lib/hooks/useStats";
import { ThemedText } from "@/components/ThemedText";

// omit form element types

type OverdueTodoFormType = {
  slug: string | undefined;
  children?: ReactNode;
};

export const OverdueTodoForm = (props: OverdueTodoFormType) => {
  const todoItem = useAppSelector((state) =>
    selectTodoById(state, props.slug!)
  );

  const { updateStatsByDate } = useStats();

  const dispatch = useAppDispatch();

  if (!todoItem) {
    return (
      <View>
        <Title>Todo not found!</Title>
      </View>
    );
  }
  const [inputReason, setInputReason] = React.useState("");
  const [inputDeadline, setInputDeadline] = React.useState(new Date());

  const reasons: Array<{ id: string; title: string }> = [
    {
      id: "more_time_required",
      title: "The task required more time than expected",
    },
    { id: "other_tasks", title: "Was working on different tasks" },
    { id: "procrastination", title: "Procrastination" },
    {
      id: "distructed_with_urgent_tasks",
      title: "Had to handle unexpected urgent tasks",
    },
    {
      id: "task_completed",
      title: "Task was completed but was not closed in time",
    },
  ];

  const currentUser = useSelector(selectUser);

  const handleSubmitClose = (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    // set status as completed

    dispatch(
      updateTodoStatus({
        userId: currentUser.user.uid,
        todoId: todoItem.id,
        newStatus: "completed",
      })
    );

    router.back();
  };

  const handleSubmitMove = async (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    dispatch(
      updateTodoStatus({
        userId: currentUser.user.uid,
        todoId: todoItem.id,
        newStatus: "completed",
      })
    );

    // for now we put deadline to the end of the Day ()
    const now = inputDeadline.getTime();
    let startOfDay = now - (now % 86400000);
    let endDate = startOfDay + 86400000 - 10;

    // set status as completed
    await dispatch(
      addNewTodo({
        userId: currentUser.user.uid,
        title: todoItem.title,
        desc: todoItem.desc,
        projectId: todoItem.projectId,
        deadline: new Date(endDate).toISOString(),
        status: "new",
        points: todoItem.points,
      })
    );

    // create new todo with new deadline

    updateStatsByDate({
      deadline: new Date(endDate).toISOString(),
      points: todoItem.points as number,
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title>Handle Overdue Todo</Title>
        <ThemedText>
          This task is overdue You can either close it or move it to different
          date
        </ThemedText>
        <ThemedText>
          Either way the task will not give you reward points
        </ThemedText>

        <Dropdown
          label="Reason"
          placeholder="Select Reason"
          options={reasons.map((reason) => ({
            label: reason.title,
            value: reason.id,
          }))}
          value={inputReason}
          onSelect={(text?: string) => {
            console.log(text);
            setInputReason(text as string);
          }}
        />

        <Button
          style={{ marginTop: 15 }}
          icon="send"
          mode="contained"
          onPress={handleSubmitClose}
        >
          Close task
        </Button>

        <ThemedText
          style={{ marginTop: 15, marginBottom: 15, textAlign: "center" }}
        >
          Or move task to date
        </ThemedText>

        <View style={{ height: 56 }}>
          <DatePickerInput
            locale="en-GB"
            label="New Deadline"
            value={inputDeadline}
            onChange={(d) => {
              setInputDeadline(d as Date);
            }}
            inputMode="start"
          />
        </View>
        <Button
          style={{ marginTop: 15 }}
          icon="send"
          mode="contained"
          onPress={handleSubmitMove}
        >
          Move to date
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
});
