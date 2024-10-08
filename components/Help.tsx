import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image } from "react-native";
import { Icon } from "react-native-paper";

/* The  ParallaxScrollView,
   ThemedText and Collapsible components are  taken from sample application 
   that is generated by  using create-expo-app:  
   https://docs.expo.dev/  */

export const HowToBlock = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={410} name="help" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">How-to </ThemedText>
      </ThemedView>
      <ThemedText>This app aims to help you with you daily tasks.</ThemedText>
      <ThemedText>
        To get started you can review this short introduction.
      </ThemedText>
      <Collapsible title="Adding your Todos">
        <ThemedText>
          To add task simply click an action button in the bottom of the screen
          and fill in the form. The task will be added to the list.
        </ThemedText>
        <Image
          source={require("@/assets/images/addTask.png")}
          style={{
            alignSelf: "center",
            width: "100%",
            maxWidth: 300,
            resizeMode: "contain",
          }}
        />
      </Collapsible>
      <Collapsible title="Completing todos">
        <ThemedText>
          When you finish the task mark it as done by clicking a radio button
          next to the task. Completed task will be crossed out.
        </ThemedText>
        <Image
          source={require("@/assets/images/complete_task.png")}
          style={{
            alignSelf: "center",
            width: "100%",
            resizeMode: "contain",
            maxWidth: 300,
          }}
        />
      </Collapsible>
      <Collapsible title="Monitoring your progress">
        <ThemedText>
          Use the Stats widget to monitore your progress. You can see the number
          of task completed, total points earned and the overal performance
          score (from 0 to 1) that defines a reward you can get
        </ThemedText>
        <Image
          source={require("@/assets/images/stats-block.png")}
          style={{
            alignSelf: "center",
            width: "100%",
            maxWidth: 300,
            resizeMode: "contain",
          }}
        />
      </Collapsible>
      <Collapsible title="Handling Overdue tasks">
        <ThemedText>
          If the task was not completed in time it will be placed to the Overdue
          section. Start your day by reviewing the overdue tasks. You can either
          close them of move them for different date. Either way, the overdue
          tasks{" "}
          <ThemedText style={{ fontWeight: "bold" }}>
            will not give you extra points
          </ThemedText>
          , so always try to close the task before deadline.
        </ThemedText>
        <Image
          source={require("@/assets/images/overdue_tasks.png")}
          style={{
            alignSelf: "center",
            width: "100%",
            maxWidth: 300,
            resizeMode: "contain",
          }}
        />
      </Collapsible>
      <Collapsible title="Getting a reward">
        <ThemedText>
          Successfully completed daily tasks will allow you to claim a reward.
          To get it navigate to the Reward section of the application. At the
          section you will be able to see you current balance, rewards you can
          claim for previous days and the variants of the prices you can "buy".
          You can also add extra prises that you think{" "}
          <ThemedText style={{ fontWeight: "bold" }}>
            {" "}
            could motivate you to finish the tasks in time.
          </ThemedText>
        </ThemedText>
      </Collapsible>

      <Collapsible title="Useful tips">
        <ThemedText>
          <Icon size={20} source={"hand-pointing-right"}></Icon> To increase
          your efficiency the application helps you to stay focused on the
          current tasks. When adding a new task it is recommended to break big
          tasks into subtasks. Each subtask should be completable within a day (
          <ThemedText type="defaultSemiBold">
            preferably within 1 or 2 hours
          </ThemedText>
          )
        </ThemedText>
        <ThemedText>
          <Icon size={20} source={"hand-pointing-right"}></Icon>To get more
          points the task has to be completed before the deadline. It is a good
          habit to review tasks at the end of the day and close those that you
          have finished.
        </ThemedText>
        <ThemedText>
          <Icon size={20} source={"hand-pointing-right"}></Icon>Try to think of
          the Rewards that would motivate you to get points. This will create
          aditional motivation for you.
        </ThemedText>
        <ThemedText>
          <Icon size={20} source={"hand-pointing-right"}></Icon>When working
          with overdue tasks you will be asked about the reason the task was not
          completed in time. This will give you extra clues how to improve your
          work habits.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
