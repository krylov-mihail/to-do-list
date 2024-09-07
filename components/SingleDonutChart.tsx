import Svg, { Circle, G } from "react-native-svg";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

type propsType = {
  radius: number;
  topLabel: string;
  centerLabel: string;
  targetAmount: number;
  completed: number;
};

export const SingleDonutChart = (props: propsType) => {
  const { radius, completed, targetAmount, topLabel, centerLabel } = {
    ...props,
  };
  const percentage = completed / targetAmount;
  const circleCircumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circleCircumference - circleCircumference * percentage; /// 100;

  const theme = useTheme();

  return (
    <View style={{ width: 70, height: 70 }}>
      <Text style={{ textAlign: "center" }}>{topLabel}</Text>
      <Svg height="70" width="70" viewBox="0 0 100 100">
        <G rotation={-90} originX="50" originY="50">
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={theme.colors.secondaryContainer}
            fill="transparent"
            strokeWidth="15"
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={theme.colors.secondary}
            fill="transparent"
            strokeWidth="15"
            strokeDasharray={circleCircumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
        <Text style={styles.text}>{centerLabel}</Text>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    top: 25,
    margin: "auto",
    fontWeight: "600",
    fontSize: 14,
    color: "#394867",
  },
});
