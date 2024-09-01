import {
  selectFutureStats,
  selectHistoryStats,
  selectTodayStats,
} from "@/lib/features/stats/statsSlice";
import { useAppSelector } from "@/lib/hooks";
import { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Chip } from "react-native-paper";
import DonutCharts from "./DonutCharts";

export default function PerformanceStats({
  children,
  dateId,
}: PropsWithChildren & { dateId: string }) {
  const currentDateString = new Date().toISOString().slice(0, 10);
  var lookUpStatsArr = [];
  var StatsData = undefined;
  var isHistory = false;

  if (`stats_${currentDateString}` < dateId) {
    lookUpStatsArr = useAppSelector(selectFutureStats);
  } else if (`stats_${currentDateString}` == dateId) {
    lookUpStatsArr = useAppSelector(selectTodayStats);
  } else {
    // check history stats
    lookUpStatsArr = useAppSelector(selectHistoryStats);
    isHistory = true;
  }

  StatsData = lookUpStatsArr.find((stats) => stats.id === dateId);

  //const performanceScore = StatsData?.score || 0;

  if (StatsData) {
    var performanceStatus = "";
    if (StatsData.completedTaskCount == 0) {
      performanceStatus = "Not yet started";
    } else if (StatsData.totalTaskCount - StatsData.completedTaskCount > 0) {
      performanceStatus = "Keep on working";
    } else {
      performanceStatus = "Well Done";
    }

    if (isHistory) {
      return (
        <View>
          <DonutCharts stats={StatsData} />
        </View>
      );
    }
    return (
      <View>
        <View style={styles.container}>
          <Chip>{`Status: ${performanceStatus}`}</Chip>
        </View>
        <DonutCharts stats={StatsData} />
      </View>
    );
  } else {
    if (isHistory) {
      return <View></View>;
    }
    return (
      <View>
        <Text>Status: Not yet started</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
