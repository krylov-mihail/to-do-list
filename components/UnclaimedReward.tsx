import {
  claimReward,
  selectHistoryStats,
} from "@/lib/features/stats/statsSlice";
import {
  selectUser,
  selectUserData,
  updatePointsBalance,
} from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Icon, List, Text, IconButton } from "react-native-paper";
import { useSelector } from "react-redux";

export const UnclaimedReward = () => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);
  const userData = useSelector(selectUserData);

  const claimeReward = async (statsId: string, points: number) => {
    const result = await dispatch(
      claimReward({ id: statsId, userId: currentUser.user.uid })
    );

    // update the total points count
    const currentPoints = userData.points;

    const resultPoints = await dispatch(
      updatePointsBalance({
        points: currentPoints + points,
        userId: currentUser.user.uid,
      })
    );
  };

  const historyStats = useAppSelector(selectHistoryStats);
  const notClaimedReward = historyStats.filter((rec) => {
    return !rec.rewardRecieved && rec.completedPoints > 0;
  });

  const showUnclaimedReward = notClaimedReward.length > 0 ? true : false;

  const renderedRewardList = notClaimedReward.map((stats) => {
    let points = Math.ceil((stats.completedPoints * 10) / stats.totalPoints);
    return (
      <List.Item
        key={stats.id}
        title={(props) => {
          return <Text {...props}>{stats.statsDate}</Text>;
        }}
        description={(props) => {
          return (
            <Text {...props}>
              {points} {points > 1 ? "points" : "point"}
            </Text>
          );
        }}
        left={(props) => {
          return <Icon {...props} source="currency-usd" size={20} />;
        }}
        right={(props) => {
          return (
            <IconButton
              {...props}
              icon="arrow-right-circle"
              mode="contained"
              onPress={() => claimeReward(stats.id, points)}
            />
          );
        }}
      />
    );
  });

  return (
    showUnclaimedReward && (
      <List.Section>
        <List.Accordion
          title={`Unclaimed Rewards: ${notClaimedReward.length}`}
          left={(props) => <List.Icon {...props} icon="alert-box" />}
        >
          {renderedRewardList}
        </List.Accordion>
      </List.Section>
    )
  );
};
