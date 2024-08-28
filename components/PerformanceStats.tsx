import {
  selectFutureStats,
  selectHistoryStats,
  selectTodayStats,
} from "@/lib/features/stats/statsSlice";
import { useAppSelector } from "@/lib/hooks";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Title, Text } from "react-native-paper";

export default function PerformanceStats({
  children,
  dateId,
}: PropsWithChildren & { dateId: string }) {
  const currentDateString = new Date().toISOString().slice(0, 10);
  var lookUpStatsArr = [];
  var StatsData = undefined;

  if (`stats_${currentDateString}` < dateId) {
    lookUpStatsArr = useAppSelector(selectFutureStats);
  } else if (`stats_${currentDateString}` == dateId) {
    lookUpStatsArr = useAppSelector(selectTodayStats);
  } else {
    // check history stats
    lookUpStatsArr = useAppSelector(selectHistoryStats);
  }

  StatsData = lookUpStatsArr.find((stats) => stats.id === dateId);

  if (StatsData) {
    return (
      <View>
        <Title>Performance Stats</Title>
        <Text>Performance stats for {dateId}</Text>
        <Text>
          Tasks {StatsData.completedTaskCount} / {StatsData.totalTaskCount}
        </Text>
        <Text>
          Points {StatsData.completedPoints} / {StatsData.totalPoints}
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Title>To see stats data add some tasks</Title>
      </View>
    );
  }
}
