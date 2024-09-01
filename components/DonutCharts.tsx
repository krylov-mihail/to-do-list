import * as React from "react";

import { StyleSheet, View } from "react-native";
import { StatsType } from "@/lib/features/stats/statsSlice";
import { SingleDonutChart } from "./SingleDonutChart";

type propsType = {
  stats: StatsType;
};

export default function DonutCharts(props: propsType) {
  const { stats } = { ...props };
  const radius = 35;

  const maxPoints = 10;
  const score = Math.ceil(
    (stats.completedPoints * maxPoints) / stats.totalPoints
  );

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          height: 100,
          padding: 20,
          justifyContent: "space-around",
        }}
      >
        <SingleDonutChart
          radius={radius}
          topLabel={"Tasks"}
          centerLabel={`${stats.completedTaskCount}/${stats.totalTaskCount}`}
          targetAmount={stats.totalTaskCount}
          completed={stats.completedTaskCount}
        />
        <SingleDonutChart
          radius={radius}
          topLabel={"Points"}
          centerLabel={`${stats.completedPoints}/${stats.totalPoints}`}
          targetAmount={stats.totalPoints}
          completed={stats.completedPoints}
        />
        <SingleDonutChart
          radius={radius}
          topLabel={"Score"}
          centerLabel={`${score}`}
          targetAmount={maxPoints}
          completed={score}
        />
      </View>
    </View>
  );
}
