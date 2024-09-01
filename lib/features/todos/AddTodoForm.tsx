import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { GestureResponderEvent, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { addNewTodo, NewTodoType, type Todo } from "./todosSlice";
import { router } from "expo-router";
import { selectAllProjects } from "../projects/projectsSlice";
import { Dropdown } from "react-native-paper-dropdown";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import {
  addNewStats,
  selectFutureStats,
  selectTodayStats,
  updateStats,
} from "../stats/statsSlice";
import { useStats } from "@/lib/hooks/useStats";

export const AddTodoForm = () => {
  const [inputTitle, setInputTitle] = React.useState("");
  const [inputDesc, setInputDesc] = React.useState("");
  const [inputProject, setInputProject] = React.useState("");
  const [inputPoints, setInputPoints] = React.useState(3);
  const [addRequestStatus, setAddRequestStatus] = React.useState<
    "idle" | "pending"
  >("idle");

  const [inputDeadline, setInputDeadline] = React.useState(new Date());

  const { updateStatsByDate } = useStats();

  const projects = useAppSelector(selectAllProjects);

  // Get the `dispatch` method from the store
  const dispatch = useAppDispatch();

  const currentUser = useSelector(selectUser);
  const todayStats = useAppSelector(selectTodayStats);
  const futureStats = useAppSelector(selectFutureStats);

  const handleSubmit = async (e: GestureResponderEvent) => {
    // Prevent server submission
    e.preventDefault();

    // for now we put deadline to the end of the Day ()
    const now = inputDeadline.getTime();
    let startOfDay = now - (now % 86400000);
    let endDate = startOfDay + 86400000 - 10;

    const newTodo: NewTodoType = {
      title: inputTitle,
      desc: inputDesc,
      projectId: inputProject,
      deadline: new Date(endDate).toISOString(),
      status: "new",
      points: inputPoints,
      userId: currentUser.user.uid,
    };

    //try {
    setAddRequestStatus("pending");
    await dispatch(addNewTodo(newTodo));
    console.log("AddTodoForm, 55 Todo added successfully");
    // clear form
    setInputTitle("");
    setInputDesc("");
    setInputProject("");
    setInputDeadline(new Date());

    // process stats information
    updateStatsByDate({
      deadline: newTodo.deadline,
      points: newTodo.points as number,
    });

    router.back();
    /* } catch (err) {
      console.error("Failed to save the todo: ", err);
    } finally {
      
    }*/

    setAddRequestStatus("idle");
  };

  return (
    <SafeAreaView>
      <View>
        <Title>Add a New Todo</Title>

        <TextInput
          label="Todo Title:"
          value={inputTitle}
          onChangeText={(text) => setInputTitle(text)}
        />

        <TextInput
          label="Todo Description:"
          value={inputDesc}
          onChangeText={(text) => setInputDesc(text)}
        />

        <Dropdown
          label="Project"
          placeholder="Select Project"
          options={projects.map((project) => ({
            label: project.title,
            value: project.id,
          }))}
          value={inputProject}
          onSelect={(text?: string) => {
            console.log(text);
            setInputProject(text as string);
          }}
        />

        <Dropdown
          label="Reward Points"
          placeholder="Select Points"
          options={[0, 1, 2, 3, 4, 5].map((point) => ({
            label: `${point}`,
            value: `${point}`,
          }))}
          value={`${inputPoints}`}
          onSelect={(text?: string) => {
            const numb = Number(text);
            setInputPoints(numb as number);
          }}
        />

        <View style={{ height: 56 }}>
          <DatePickerInput
            locale="en-GB"
            label="Deadline"
            value={inputDeadline}
            onChange={(d) => {
              console.log("d", d);
              setInputDeadline(d as Date);
            }}
            inputMode="start"
          />
        </View>
        <Button
          style={{ marginTop: 15 }}
          icon="send"
          mode="contained"
          onPress={handleSubmit}
        >
          Save todo
        </Button>
      </View>
    </SafeAreaView>
  );
};
