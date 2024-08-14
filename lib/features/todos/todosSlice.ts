import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: "1", title: "First Task!", content: "Hello!" },
    { id: "2", title: "Second Task", content: "More text" },
  ],
  status: "idle",
  error: null,
};

// Infer the type from the initial state
type TodoType = (typeof initialState.todos)[0];

// Optionally, you can create an interface from the inferred type
interface Todo extends TodoType {}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    /*getTodo: (state, action): Todo | undefined => {
      let id = undefined;
      id = state.todos.find((todo) => todo.id === action.payload);
      return id;
    },*/
  },
});
export const { addTodo /*, getTodo*/ } = todosSlice.actions;
export const selectUser = (state: { todos: { task: any } }) => state.todos.task;
export default todosSlice.reducer;
