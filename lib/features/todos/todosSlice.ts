import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";
// import { sub, add } from "date-fns";
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
   */
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

type TodoUpdateType = Pick<Todo, "id" | "title" | "desc" | "projectId"> & {
  userId: string;
};

export type NewTodoType = Pick<
  Todo,
  "title" | "desc" | "projectId" | "deadline" | "status"
> & {
  userId: string;
};

export type ToDoStatusType = "new" | "completed";

export const fetchTodosByUser = createAsyncThunk(
  "todos/fetchTodos",
  async (userId: string) => {
    const items = await getTodos(db, userId);

    const convertedItems = items.map((el) => {
      /* end of the selected day */
      const newDeadline = new Date(el.deadline).toISOString();
      const newEl = { ...el, deadline: newDeadline };
      return newEl;
    });

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

export const updateTodoStatus = createAsyncThunk(
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

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",

  async (data: TodoUpdateType) => {
    // We send the initial data to the firestore

    const docRef = await setDoc(
      doc(db, `users/user_${data.userId}/todos`, data.id),
      {
        title: data.title,
        desc: data.desc,
        projectId: data.projectId,
      },
      { merge: true }
    );
    // The response includes the complete post object, including unique ID

    return {
      id: data.id,
      title: data.title,
      desc: data.desc,
      projectId: data.projectId,
    };
  }
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  // The payload creator receives the partial `{title, desc, projectId,deadline, status, userId}` object
  async (initialTodo: NewTodoType) => {
    // We send the initial data to the firestore
    // const response = await client.post<Post>("/fakeApi/posts", initialPost);

    const docRef = await addDoc(
      collection(db, `users/user_${initialTodo.userId}/todos`),
      {
        title: initialTodo.title,
        desc: initialTodo.desc,
        projectId: initialTodo.projectId,
        deadline: initialTodo.deadline,
        status: initialTodo.status,
      }
    );
    // The response includes the complete post object, including unique ID

    return {
      id: docRef.id,
      title: initialTodo.title,
      desc: initialTodo.desc,
      projectId: initialTodo.projectId,
      deadline: initialTodo.deadline,
      status: initialTodo.status,
    };
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    /* todoUpdated: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);

      const { title, desc, projectId, deadline } = action.payload;
      if (todo) {
        todo.title = title;
        todo.desc = desc;
        todo.projectId = projectId;
        todo.deadline = deadline;
      }
    },
    /* todoStatusUpdated: (
      state,
      action: PayloadAction<{ todoId: string; status: "new" | "completed" }>
    ) => {
      const todoId = action.payload.todoId;
      const todo = state.todos.find((todo) => todo.id === todoId);

      if (todo) {
        todo.status = action.payload.status;
      }
    },*/
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
        console.log("todosSlice, 163, action.payload", action.payload);
        state.todos.push(...action.payload);
      })
      .addCase(fetchTodosByUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        // We can directly add the new todo object to our todo array
        state.todos.push(action.payload as Todo);
      })
      .addCase(updateTodoStatus.fulfilled, (state, action) => {
        const todoId = action.payload.todoId;
        const todo = state.todos.find((todo) => todo.id === todoId);

        if (todo) {
          todo.status = action.payload.status;
        }
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const todoId = action.payload.id;
        const todo = state.todos.find((todo) => todo.id === todoId);

        if (todo) {
          todo.title = action.payload.title;
          todo.desc = action.payload.desc;
          todo.projectId = action.payload.projectId;
        }
      });
  },
});

export const selectAllTodos = (state: RootState) => state.todos.todos;

export const selectTodoById = (state: RootState, todoId: string) =>
  state.todos.todos.find((todo) => todo.id === todoId);

export const selectUser = (state: { todos: { task: any } }) => state.todos.task;
export default todosSlice.reducer;

export const selectTodosStatus = (state: RootState) => state.todos.status;
export const selectTodosError = (state: RootState) => state.todos.error;
