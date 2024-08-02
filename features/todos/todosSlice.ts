import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: "1", title: "First Task!", content: "Hello!" },
    { id: "2", title: "Second Task", content: "More text" },
  ],
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
  },
});
export const { addTodo } = userSlice.actions;
export const selectUser = (state: { user: { user: any } }) => state.user.user;
export default userSlice.reducer;
