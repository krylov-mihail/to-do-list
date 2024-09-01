import { useAppSelector } from "@/lib/hooks";
import {
  selectFutureStats,
  selectHistoryStats,
  selectTodayStats,
} from "../features/stats/statsSlice";

export const useStats = () => {
  const todayStats = useAppSelector(selectTodayStats);
  const futureStats = useAppSelector(selectFutureStats);
  const historyStats = useAppSelector(selectHistoryStats);

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

  return { getStatsByDate };
};
