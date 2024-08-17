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
    },
    {
      id: "2",
      title: "Second Task",
      desc: "More text",
      projectId: "2",
      deadline: add(new Date(), { days: 3 }).toISOString(),
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
        deadline: string
      ) {
        return {
          payload: { id: nanoid(), title, desc, projectId, deadline },
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
  },
});

export const selectAllTodos = (state: RootState) => state.todos;

export const selectTodoById = (state: RootState, todoId: string) =>
  state.todos.todos.find((todo) => todo.id === todoId);

export const { todoAdded, todoUpdated } = todosSlice.actions;
export const selectUser = (state: { todos: { task: any } }) => state.todos.task;
export default todosSlice.reducer;
