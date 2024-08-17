import { RootState } from "@/lib/store";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: "1", title: "First Task!", desc: "Hello!", projectId: "1" },
    { id: "2", title: "Second Task", desc: "More text", projectId: "2" },
  ],
  status: "idle",
  error: null,
};

export interface Todo {
  id: string;
  title: string;
  desc: string;
  projectId: string;
}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action: PayloadAction<Todo>) {
        state.todos.push(action.payload);
      },
      prepare(title: string, desc: string, projectId: string) {
        return {
          payload: { id: nanoid(), title, desc, projectId },
        };
      },
    },
    todoUpdated: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);

      const { title, desc, projectId } = action.payload;
      if (todo) {
        todo.title = title;
        todo.desc = desc;
        todo.projectId = projectId;
      }
    },
  },
});

export const selectAllTodos = (state: RootState) => state.todos;

export const selectTodoById = (state: RootState, todoId: string) =>
  state.todos.todos.find((todo) => todo.id === todoId);

export const { todoAdded, todoUpdated } = todosSlice.actions;
export const selectUser = (state: { todos: { task: any } }) => state.todos.task;
export default todosSlice.reducer;
