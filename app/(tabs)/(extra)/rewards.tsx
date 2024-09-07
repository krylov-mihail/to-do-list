import { UnclaimedReward } from "@/components/UnclaimedReward";
import { RewardsList } from "@/lib/features/rewards/rewardsList";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useAppSelector } from "@/lib/hooks";
import { selectUserData } from "@/lib/features/user/userSlice";
import { Text } from "react-native-paper";
export default function Page() {
  const userData = useAppSelector(selectUserData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Available points: {userData.points}</Text>
        <UnclaimedReward />
        <RewardsList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
