import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";
import { sub, add } from "date-fns";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { app as FirebaseApp } from "@/firebase.Config";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore/lite";
import { logout } from "../user/userSlice";
import { addNewTodo } from "../todos/todosSlice";

const db = getFirestore(FirebaseApp);

const initialState: {
  historyStats: Array<StatsType>;
  futureStats: Array<StatsType>;
  todayStats: Array<StatsType>;
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
} = {
  historyStats: [],
  todayStats: [],
  futureStats: [],
  status: "idle",
  error: null,
};

export type StatsType = {
  id: string;
  statsDate: string;
  totalTaskCount: number;
  completedTaskCount: number;
  totalPoints: number;
  completedPoints: number;
};

type StatsUpdateType = Pick<
  StatsType,
  | "id"
  | "totalTaskCount"
  | "completedTaskCount"
  | "totalPoints"
  | "completedPoints"
  | "statsDate"
> & {
  userId: string;
};

export type StatsNewType = Pick<
  StatsType,
  | "statsDate"
  | "id"
  | "totalTaskCount"
  | "completedTaskCount"
  | "totalPoints"
  | "completedPoints"
> & {
  userId: string;
};

export const fetchStatsForUser = createAsyncThunk(
  "todos/fetchStats",
  async (userId: string) => {
    const items = await getStats(db, userId);

    return items as Array<StatsType>;
  },
  // third optional argument to prefent  double fetching
  {
    condition(arg, thunkApi) {
      const statsFetchStatus = selectStatsStatus(
        thunkApi.getState() as RootState
      );
      if (statsFetchStatus !== "idle") {
        return false;
      }
    },
  }
);

const getStats = async (db: Firestore, userId: string) => {
  const statsCol = collection(db, `users/user_${userId}/stats`);
  const statsSnapshot = await getDocs(statsCol);
  const statsList = statsSnapshot.docs.map((doc) => {
    var data = doc.data();
    data.id = doc.id;
    return data;
  });

  return statsList;
};

/*export const updateTodoStatus = createAsyncThunk(
  "todos/updateTodoStatus",

  async (data: {
    userId: string;
    todoId: string;
    newStatus: ToDoStatusType;
  }) => {
    // We send the initial data to the firestore

    const docRef = await setDoc(
      doc(db, `users/user_${data.userId}/todos`, data.todoId),
      {
        status: data.newStatus,
      },
      { merge: true }
    );
    // The response includes the complete post object, including unique ID

    return {
      todoId: data.todoId,
      status: data.newStatus,
    };
  }
);
*/
export const updateStats = createAsyncThunk(
  "stats/updateStats",

  async (initialStatsData: StatsUpdateType) => {
    // We send the initial data to the firestore
    const id = `stats_${initialStatsData.statsDate}`;
    console.log(
      "statsSlice, updateStats, 132, initialStatsData",
      initialStatsData
    );
    const docRef = await setDoc(
      doc(db, `users/user_${initialStatsData.userId}/stats`, id),
      {
        statsDate: initialStatsData.statsDate,
        totalTaskCount: initialStatsData.totalTaskCount,
        completedTaskCount: initialStatsData.completedTaskCount,
        totalPoints: initialStatsData.totalPoints,
        completedPoints: initialStatsData.completedPoints,
      }
    );
    // The response includes the complete post object, including unique ID

    return {
      id: id,
      statsDate: initialStatsData.statsDate,
      totalTaskCount: initialStatsData.totalTaskCount,
      completedTaskCount: initialStatsData.completedTaskCount,
      totalPoints: initialStatsData.totalPoints,
      completedPoints: initialStatsData.completedPoints,
    };
  }
);

export const addNewStats = createAsyncThunk(
  "stats/addNewStats",
  // The payload creator receives the partial `{title, desc, projectId,deadline, status, userId}` object
  async (initialStatsData: StatsNewType) => {
    // We send the initial data to the firestore

    const id = `stats_${initialStatsData.statsDate}`;
    console.log(
      "statsSlice, addNewStats, 157, initialStatsData",
      initialStatsData
    );

    const docRef = await setDoc(
      doc(db, `users/user_${initialStatsData.userId}/stats`, id),
      {
        statsDate: initialStatsData.statsDate,
        totalTaskCount: initialStatsData.totalTaskCount,
        completedTaskCount: initialStatsData.completedTaskCount,
        totalPoints: initialStatsData.totalPoints,
        completedPoints: initialStatsData.completedPoints,
      }
    );
    // The response includes the complete post object, including unique ID

    return {
      id: id,
      statsDate: initialStatsData.statsDate,
      totalTaskCount: initialStatsData.totalTaskCount,
      completedTaskCount: initialStatsData.completedTaskCount,
      totalPoints: initialStatsData.totalPoints,
      completedPoints: initialStatsData.completedPoints,
    };
  }
);

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        // Clear out the list of stats whenever the user logs out
        return initialState;
      })
      .addCase(fetchStatsForUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchStatsForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched todos to the array
        console.log("statsSlice, 185, action.payload", action.payload);
        const currentDateString = new Date().toISOString().slice(0, 10);
        const historyStats = action.payload.filter(
          (stat) => stat.statsDate < currentDateString
        );
        const todayStats = action.payload.filter(
          (stat) => stat.statsDate == currentDateString
        );
        const futureStats = action.payload.filter(
          (stat) => stat.statsDate > currentDateString
        );

        state.historyStats = historyStats;
        state.todayStats = todayStats;
        state.futureStats = futureStats;
      })
      .addCase(fetchStatsForUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(addNewStats.fulfilled, (state, action) => {
        const currentDateString = new Date().toISOString().slice(0, 10);
        if (currentDateString === action.payload.statsDate) {
          state.todayStats.push(action.payload as StatsType);
        } else {
          // future stats
          state.futureStats.push(action.payload as StatsType);
        }
      })
      .addCase(updateStats.fulfilled, (state, action) => {
        const currentDateString = new Date().toISOString().slice(0, 10);
        const statsId = action.payload.id;
        var stats = null;

        if (currentDateString === action.payload.statsDate) {
          stats = state.todayStats.find((st) => st.id === statsId);
        } else {
          stats = state.futureStats.find((st) => st.id === statsId);
        }

        if (stats) {
          stats.totalTaskCount = action.payload.totalTaskCount;
          stats.completedTaskCount = action.payload.completedTaskCount;
          stats.totalPoints = action.payload.totalPoints;
          stats.completedPoints = action.payload.completedPoints;
        }
      });
  },
});

export const selectHistoryStats = (state: RootState) =>
  state.stats.historyStats;

export const selectTodayStats = (state: RootState) => state.stats.todayStats;

export const selectFutureStats = (state: RootState) => state.stats.futureStats;

export const selectStatsStatus = (state: RootState) => state.stats.status;
export const selectStatsError = (state: RootState) => state.stats.error;

export default statsSlice.reducer;
