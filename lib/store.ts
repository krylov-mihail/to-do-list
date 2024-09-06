import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import todosReducer from "./features/todos/todosSlice";
import projectsReducer from "./features/projects/projectsSlice";
import statsReducer from "./features/stats/statsSlice";
import rewardsReducer from "./features/rewards/rewardsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
    projects: projectsReducer,
    stats: statsReducer,
    rewards: rewardsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
