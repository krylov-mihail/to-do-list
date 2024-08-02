import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import todosReducer from "./features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
