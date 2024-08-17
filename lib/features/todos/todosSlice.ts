import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: "1", title: "First Task!", desc: "Hello!" },
    { id: "2", title: "Second Task", desc: "More text" },
  ],
  status: "idle",
  error: null,
};

// Infer the type from the initial state
type TodoType = (typeof initialState.todos)[0];

// Optionally, you can create an interface from the inferred type
export interface Todo extends TodoType {}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    todoUpdated: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);

      const { title, desc } = action.payload;
      /*const newTodo = {
        ...todo,
        title: action.payload.title,
        desc: action.payload.desc,
      };*/

      if (todo) {
        todo.title = title;
        todo.desc = desc;
      }
    },
  },
});
export const { addTodo, todoUpdated } = todosSlice.actions;
export const selectUser = (state: { todos: { task: any } }) => state.todos.task;
export default todosSlice.reducer;
