import {
  selectFutureStats,
  selectHistoryStats,
  selectTodayStats,
} from "@/lib/features/stats/statsSlice";
import { useAppSelector } from "@/lib/hooks";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Title, Text, Chip } from "react-native-paper";
import DonutCharts from "./DonutCharts";

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

  //const performanceScore = StatsData?.score || 0;

  if (StatsData) {
    var performanceStatus = "";
    if (StatsData.totalTaskCount - StatsData.completedTaskCount > 0) {
      performanceStatus = "Keep on working";
    } else {
      performanceStatus = "Well Done";
    }

    return (
      <View>
        <Text>
          Your Performance: <Chip>{`${performanceStatus}`}</Chip>
        </Text>
        <DonutCharts stats={StatsData} />
      </View>
    );
  } else {
    return (
      <View>
        <Title>Your Performance: Not yet started</Title>
      </View>
    );
  }
}
