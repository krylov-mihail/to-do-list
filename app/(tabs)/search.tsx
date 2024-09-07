import { FABButton } from "@/components/FABButton";
import { TodosList } from "@/lib/features/todos/todosList";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

export default function Page() {
  const [viewDate, setViewDate] = React.useState(new Date());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text variant="titleMedium">Pick up a date</Text>
        <DatePickerInput
          inputMode="end"
          onChange={function (date: Date | undefined): void {
            // for the date is calcualted in UTC that is 2 hours behind current date,
            // so the previous date is returned we add extra seconds to make sure we
            // rendering correct date

            if (date) {
              const now = date.getTime();
              let startOfDay = now - (now % 86400000);
              let endDate = startOfDay + 86400000 + 100;
              const recalculatedDate = new Date(endDate);

              setViewDate(recalculatedDate);
            }
          }}
          value={viewDate}
          locale="en-GB"
          label="Format:"
        />
        <TodosList renderDate={viewDate.toISOString().slice(0, 10)} />
      </ScrollView>
      <FABButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  offset: {
    paddingTop: 10,
  },
});
