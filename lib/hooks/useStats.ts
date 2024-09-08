import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addNewStats,
  selectFutureStats,
  selectHistoryStats,
  selectTodayStats,
  updateStats,
} from "../features/stats/statsSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

export const useStats = () => {
  const todayStats = useAppSelector(selectTodayStats);
  const futureStats = useAppSelector(selectFutureStats);
  const historyStats = useAppSelector(selectHistoryStats);
  const currentUser = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const updateStatsByDate = (newTodo: { deadline: string; points: number }) => {
    const currentDateString = new Date().toISOString().slice(0, 10);
    const todoDeadlineDate = newTodo.deadline.slice(0, 10);

    var currentStatsData = getStatsByDate(todoDeadlineDate);

    if (currentDateString <= todoDeadlineDate) {
      // we do not update historical stats

      if (currentStatsData === null) {
        // we  will create a new stats

        const NewStats = {
          id: `stats_${todoDeadlineDate}`,
          statsDate: todoDeadlineDate,
          totalTaskCount: 1,
          completedTaskCount: 0,
          totalPoints: newTodo.points
            ? parseInt(newTodo.points as any as string)
            : 0,
          completedPoints: 0,
          userId: currentUser.user.uid,
        };

        dispatch(addNewStats(NewStats));
      } else {
        // we will update existing stats
        const todoPoints = newTodo.points !== undefined ? newTodo.points : 0;

        const UpdatedStats = {
          id: `stats_${todoDeadlineDate}`,
          statsDate: todoDeadlineDate,
          totalTaskCount: currentStatsData.totalTaskCount + 1,
          completedTaskCount: currentStatsData.completedTaskCount,
          totalPoints: currentStatsData.totalPoints + todoPoints,
          completedPoints: currentStatsData.completedPoints,
          userId: currentUser.user.uid,
        };

        dispatch(updateStats(UpdatedStats));
      }
    }
  };

  const getStatsByDate = (statsDate: string) => {
    const currentDateString = new Date().toISOString().slice(0, 10);
    var currentTaskData = null;

    if (currentDateString == statsDate) {
      // todo was created for today
      // check we already have data in stats
      if (todayStats.length > 0) {
        currentTaskData = todayStats[0];
      }
    } else if (currentDateString < statsDate) {
      const FilteredData = futureStats.filter((stats) => {
        stats.statsDate == statsDate;
      });

      if (FilteredData.length > 0) {
        currentTaskData = FilteredData[0];
      }
    } else if (currentDateString > statsDate) {
      const FilteredData = historyStats.filter((stats) => {
        stats.statsDate == statsDate;
      });

      if (FilteredData.length > 0) {
        currentTaskData = FilteredData[0];
      }
    }

    return currentTaskData;
  };

  return { getStatsByDate, updateStatsByDate };
};
