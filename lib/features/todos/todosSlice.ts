import { RootState } from "@/lib/store";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub, add } from "date-fns";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { app as FirebaseApp } from "@/firebase.Config";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore/lite";
import { logout } from "../user/userSlice";

const db = getFirestore(FirebaseApp);

const initialState: {
  todos: Array<Todo>;
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
} = {
  todos: [
    /*{
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
    },*/
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

export const fetchTodosByUser = createAsyncThunk(
  "todos/fetchTodos",
  async (userId: string) => {
    const items = await getTodos(db, userId);

    const convertedItems = items.map((el) => {
      const newDeadline = el.deadline.toDate().toISOString();
      const newEl = { ...el, deadline: newDeadline };
      return newEl;
    });

    console.log("convertedItems", convertedItems);

    return convertedItems as Array<Todo>;
  },
  // third optional argument to prefent  double fetching
  {
    condition(arg, thunkApi) {
      const todosStatus = selectTodosStatus(thunkApi.getState() as RootState);
      if (todosStatus !== "idle") {
        return false;
      }
    },
  }
);

const getTodos = async (db: Firestore, userId: string) => {
  const todosCol = collection(db, `users/user_${userId}/todos`);
  const todosSnapshot = await getDocs(todosCol);
  const todosList = todosSnapshot.docs.map((doc) => {
    var data = doc.data();
    data.id = doc.id;
    return data;
  });
  return todosList;
};
/*
export const fetchTodoById = createAsyncThunk(
  'todos/fetchTodoById',
  async (itemId: string) => {
    const item = await someHttpRequest(itemId)
    return item
  }
)*/

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
      action: PayloadAction<{ todoId: string; status: "new" | "completed" }>
    ) => {
      const todoId = action.payload.todoId;
      const todo = state.todos.find((todo) => todo.id === todoId);

      if (todo) {
        todo.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        // Clear out the list of todos whenever the user logs out
        return initialState;
      })
      .addCase(fetchTodosByUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchTodosByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched todos to the array
        state.todos.push(...action.payload);
      })
      .addCase(fetchTodosByUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export const selectAllTodos = (state: RootState) => state.todos.todos;

export const selectTodoById = (state: RootState, todoId: string) =>
  state.todos.todos.find((todo) => todo.id === todoId);

export const { todoAdded, todoUpdated, todoStatusUpdated } = todosSlice.actions;
export const selectUser = (state: { todos: { task: any } }) => state.todos.task;
export default todosSlice.reducer;

export const selectTodosStatus = (state: RootState) => state.todos.status;
export const selectTodosError = (state: RootState) => state.todos.error;
