import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { app as FirebaseApp } from "@/firebase.Config";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  addDoc,
} from "firebase/firestore/lite";
import { logout } from "../user/userSlice";

const db = getFirestore(FirebaseApp);

// Define a TS type for the data we'll be using
export interface RewardType {
  id: string;
  title: string;
  desc: string;
  price: number;
}

type RewardUpdateType = Pick<RewardType, "id" | "title" | "desc" | "price"> & {
  userId: string;
};

export type NewRewardType = Pick<RewardType, "title" | "desc" | "price"> & {
  userId: string;
};

export const fetchRewardsForUser = createAsyncThunk(
  "rewards/fetchRewards",
  async (userId: string) => {
    const items = await getRewards(db, userId);

    return items as Array<RewardType>;
  },
  // third optional argument to prefent  double fetching
  {
    condition(arg, thunkApi) {
      const projectLoadStatus = selectRewardsLoadStatus(
        thunkApi.getState() as RootState
      );
      if (projectLoadStatus !== "idle") {
        return false;
      }
    },
  }
);

export const addNewReward = createAsyncThunk(
  "rewards/addNewReward",
  // The payload creator receives the partial `{title, desc, user}` object
  async (initialReward: NewRewardType) => {
    // We send the initial data to the firestore

    console.log(
      "reward slice addNewReward 59, data",
      {
        title: initialReward.title,
        desc: initialReward.desc,
        price: initialReward.price,
      },
      `users/user_${initialReward.userId}/rewards`
    );
    const docRef = await addDoc(
      collection(db, `users/user_${initialReward.userId}/rewards`),
      {
        title: initialReward.title,
        desc: initialReward.desc,
        price: initialReward.price,
      }
    );
    // The response includes the complete post object, including unique ID

    return {
      id: docRef.id,
      title: initialReward.title,
      desc: initialReward.desc,
      price: initialReward.price,
    };
  }
);

const getRewards = async (db: Firestore, userId: string) => {
  console.log(
    `file rewardSlice, line 79, fetching awailable rewards, userId =${userId}, url = users/user_${userId}/rewards`
  );
  const rewardsCol = collection(db, `users/user_${userId}/rewards`);
  const rewardsSnapshot = await getDocs(rewardsCol);
  const rewardsList = rewardsSnapshot.docs.map((doc) => {
    var data = doc.data();
    data.id = doc.id;
    return data;
  });
  console.log("rewardsSlice,88, response from Firestore", rewardsList);
  return rewardsList;
};

const initialState: {
  rewards: Array<RewardType>;
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
} = {
  rewards: [],
  status: "idle",
  error: null,
};

export const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    addReward: (state, action) => {
      // "Mutate" the existing state array, which is
      // safe to do here because `createSlice` uses Immer inside.
      state.rewards.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logout, (state) => {
        // Clear out the list of projects whenever the user logs out
        return initialState;
      })
      .addCase(addNewReward.fulfilled, (state, action) => {
        // We can directly add the new project object to our projects array
        state.rewards.push(action.payload as RewardType);
      })
      .addCase(fetchRewardsForUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchRewardsForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched projects to the array
        state.rewards.push(...action.payload);
      })
      .addCase(fetchRewardsForUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});
// Export the auto-generated action creator with the same name

export const { addReward } = rewardsSlice.actions;

export const selectAllRewards = (state: RootState) => state.rewards.rewards;

export const selectRewardById = (state: RootState, rewardId: string | null) =>
  state.rewards.rewards.find((rewardItem) => rewardItem.id === rewardId);

export default rewardsSlice.reducer;

export const selectRewardsLoadStatus = (state: RootState) =>
  state.rewards.status;
export const selectRewardsLoadError = (state: RootState) => state.rewards.error;
