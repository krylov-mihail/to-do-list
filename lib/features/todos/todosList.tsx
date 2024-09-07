import React from "react";
import { View, StyleSheet } from "react-native";
import { List, ActivityIndicator, Text } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import {
  selectAllTodos,
  selectTodosStatus,
  selectTodosError,
  updateTodoStatus,
} from "./todosSlice";
import { selectUser } from "../user/userSlice";
import PerformanceStats from "@/components/PerformanceStats";
import { StatsUpdateType, updateStats } from "../stats/statsSlice";
import { useStats } from "@/lib/hooks/useStats";
import { TasksToDo } from "@/components/TasksToDo";

type propsType = { renderDate: string };

export const TodosList = (props: propsType) => {
  /*get todos from Redux*/
  const todos = useAppSelector(selectAllTodos);
  const dispatch = useAppDispatch();

  const todosStatus = useAppSelector(selectTodosStatus);
  /* in case we fail to fetch data from firebase, we will get error message  */
  const todosError = useAppSelector(selectTodosError);

  const currentUser = useAppSelector(selectUser);
  const { getStatsByDate } = useStats();

  const { renderDate } = { ...props };
  const currentDateString = renderDate;

  // todo status update logic
  const updateStatus = async (todoId: string, status: "new" | "completed") => {
    await dispatch(
      updateTodoStatus({
        todoId,
        newStatus: status,
        userId: currentUser.user.uid,
      })
    );

    const todoData = todos.find((todo) => todo.id == todoId);

    if (todoData) {
      const todoDeadlineDate = todoData.deadline.slice(0, 10);
      // if the date is today or future date
      // we update stats

      if (todoDeadlineDate >= currentDateString) {
        var currentStatsData = getStatsByDate(todoDeadlineDate);

        if (currentStatsData) {
          var pointsToAdd = 0;
          if (todoData.points != undefined) {
            pointsToAdd =
              status == "completed"
                ? todoData.points
                : currentStatsData.completedPoints >= todoData.points
                ? -todoData.points
                : 0;
          }
          const tasksToAdd =
            status == "completed"
              ? 1
              : currentStatsData.completedTaskCount == 0
              ? 0
              : -1;

          const updatedStatsData: StatsUpdateType = {
            id: currentStatsData.id,
            totalTaskCount: currentStatsData.totalTaskCount, // total task count should not change
            completedTaskCount:
              currentStatsData.completedTaskCount + tasksToAdd,
            totalPoints: currentStatsData.totalPoints, // total points count will not change
            completedPoints: currentStatsData.completedPoints + pointsToAdd,
            statsDate: currentStatsData.statsDate,
            userId: currentUser.user.uid,
          };

          await dispatch(updateStats(updatedStatsData));
        }
      }
    }
  };

  /* state variables to manage  bulk task update */
  const [checkedArr, setCheckedArr] = React.useState<string[]>([]);
  const [multiMode, setmultiMode] = React.useState("unchecked");

  const onButtonToggle = () => {
    setmultiMode(multiMode === "checked" ? "unchecked" : "checked");
  };

  const dateId = `stats_${renderDate}`;

  if (todosStatus === "pending") {
    return (
      <View>
        <PerformanceStats dateId={dateId}></PerformanceStats>
        <ActivityIndicator />
      </View>
    );
  } else if (todosStatus === "rejected") {
    return (
      <View>
        <Text>{todosError}</Text>;
      </View>
    );
  } else if (todosStatus === "succeeded") {
    // Sort todos in reverse chronological order by datetime string
    /* const orderedTodos = todos
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))*/
    /* render todos */

    // 1. we have completed todos
    // 2. overdue todos
    // 3. current todos

    const overdueTodos = todos.filter((todo) => {
      return (
        todo.status != "completed" &&
        currentDateString > todo.deadline.slice(0, 10)
      );
    });

    const currentTodos = todos.filter((todo) => {
      return (
        todo.status == "new" && currentDateString == todo.deadline.slice(0, 10)
      );
    });

    const completedTodos = todos.filter((todo) => {
      return (
        todo.status == "completed" &&
        currentDateString == todo.deadline.slice(0, 10)
      );
    });

    const showOverdue =
      overdueTodos.length > 0 &&
      currentDateString == new Date().toISOString().slice(0, 10);

    return (
      <View>
        {/* not used currently as mass actions functionality is not yet implemented */
        /*<ToggleButton
        icon="checkbox-multiple-outline"
        value="checkbox-multiple-outline"
        status={multiMode as undefined & "checked" & "unchecked"}
        onPress={onButtonToggle}
      />*/}
        <PerformanceStats dateId={dateId}></PerformanceStats>
        {showOverdue && (
          <List.Section style={style.offset}>
            <List.Accordion
              title={`Overdue ${overdueTodos.length} tasks`}
              left={(props) => <List.Icon {...props} icon="alert-box" />}
            >
              <TasksToDo
                status="overdue"
                multimode={multiMode}
                checkedArr={checkedArr}
                tasks={overdueTodos}
                setCheckedArr={setCheckedArr}
                updateStatus={updateStatus}
              />
            </List.Accordion>
          </List.Section>
        )}
        {(currentTodos.length > 0 || completedTodos.length > 0) && (
          <Text variant="titleMedium" style={style.offset}>
            Tasks
          </Text>
        )}
        <List.Section>
          <TasksToDo
            status="new"
            multimode={multiMode}
            checkedArr={checkedArr}
            tasks={currentTodos}
            setCheckedArr={setCheckedArr}
            updateStatus={updateStatus}
          />

          <TasksToDo
            status="completed"
            multimode={multiMode}
            checkedArr={checkedArr}
            tasks={completedTodos}
            setCheckedArr={setCheckedArr}
            updateStatus={updateStatus}
          />
        </List.Section>
      </View>
    );
  }
};

const style = StyleSheet.create({
  offset: {
    paddingTop: 10,
  },
});
