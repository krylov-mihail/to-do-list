import { parseISO, formatDistanceToNow } from "date-fns";

import { Text } from "react-native";

interface TimeSpanProps {
  timestamp: string;
}

export const TimeSpan = ({ timestamp }: TimeSpanProps) => {
  let timeSpan = "";

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeSpan = date < new Date() ? `${timePeriod} ago` : `in ${timePeriod} `;
  }

  return <Text>Deadline: {timeSpan}</Text>;
};
