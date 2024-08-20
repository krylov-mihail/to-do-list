import { RootState } from "@/lib/store";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub, add } from "date-fns";

const initialState = {
  todos: [
    {
      id: "1",
      title: "First Task!",
      desc: "Hello!",
      projectId: "1",
      deadline: sub(new Date(), { days: 2 }).toISOString(),
      status: "new",
    },
    {
      id: "2",
      title: "Second Task",
      desc: "More text",
      projectId: "2",
      deadline: add(new Date(), { days: 3 }).toISOString(),
      status: "new",
    },
    {
      id: "3",
      title: "Third Task",
      desc: "This is a task with a long description to check how it will look like rendered at the screen. This is a task with a long description to check how it will look like rendered at the screen.",
      projectId: "2",
      deadline: new Date().toISOString(),
      status: "new",
    },
  ],
  status: "idle",
  error: null,
};

export interface Todo {
  id: string;
  title: string;
  desc: string;
  projectId: string;
  deadline: string;
  status: "new" | "completed";
}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action: PayloadAction<Todo>) {
        state.todos.push(action.payload);
      },
      prepare(
        title: string,
        desc: string,
        projectId: string,
        deadline: string,
        status: "new" | "completed"
      ) {
        return {
          payload: { id: nanoid(), title, desc, projectId, deadline, status },
        };
      },
    },
    todoUpdated: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);

      const { title, desc, projectId, deadline } = action.payload;
      if (todo) {
        todo.title = title;
        todo.desc = desc;
        todo.projectId = projectId;
        todo.deadline = deadline;
      }
    },
    todoStatusUpdated: (
      state,
      action: PayloadAction<{ todoId: string; status: string }>
    ) => {
      const todoId = action.payload.todoId;
      const todo = state.todos.find((todo) => todo.id === todoId);

      if (todo) {
        todo.status = action.payload.status;
      }
    },
  },
});

export const selectAllTodos = (state: RootState) => state.todos;

export const selectTodoById = (state: RootState, todoId: string) =>
  state.todos.todos.find((todo) => todo.id === todoId);

export const { todoAdded, todoUpdated, todoStatusUpdated } = todosSlice.actions;
export const selectUser = (state: { todos: { task: any } }) => state.todos.task;
export default todosSlice.reducer;
