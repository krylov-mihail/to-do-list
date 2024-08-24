import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { app as FirebaseApp } from "@/firebase.Config";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore/lite";

const db = getFirestore(FirebaseApp);

// Define a TS type for the data we'll be using
export interface Project {
  id: string;
  title: string;
  desc: string;
}

export const fetchProjectsForUser = createAsyncThunk(
  "todos/fetchProjects",
  async (userId: string) => {
    const items = await getProjects(db, userId);

    return items as Array<Project>;
  },
  // third optional argument to prefent  double fetching
  {
    condition(arg, thunkApi) {
      const projectLoadStatus = selectProjectStatus(
        thunkApi.getState() as RootState
      );
      if (projectLoadStatus !== "idle") {
        return false;
      }
    },
  }
);

const getProjects = async (db: Firestore, userId: string) => {
  const projectsCol = collection(db, `users/user_${userId}/todos`);
  const projectsSnapshot = await getDocs(projectsCol);
  const projectsList = projectsSnapshot.docs.map((doc) => {
    var data = doc.data();
    data.id = doc.id;
    return data;
  });
  return projectsList;
};

const initialState: {
  projects: Array<Project>;
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
} = {
  projects: [],
  status: "idle",
  error: null,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      // "Mutate" the existing state array, which is
      // safe to do here because `createSlice` uses Immer inside.
      state.projects.push(action.payload);
    },
  },
});
// Export the auto-generated action creator with the same name

export const { addProject } = projectsSlice.actions;

export const selectAllProjects = (state: RootState) => state.projects.projects;

export const selectProjectById = (state: RootState, projectId: string | null) =>
  state.projects.projects.find((project) => project.id === projectId);

export default projectsSlice.reducer;

export const selectProjectStatus = (state: RootState) => state.projects.status;
export const selectProjectError = (state: RootState) => state.projects.error;
