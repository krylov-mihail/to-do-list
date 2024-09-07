import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { app as FirebaseApp } from "@/firebase.Config";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  addDoc,
} from "firebase/firestore/lite";
import { logout } from "../user/userSlice";

const db = getFirestore(FirebaseApp);

// Define a TS type for the data we'll be using
export interface Project {
  id: string;
  title: string;
  desc: string;
}

type ProjectUpdate = Pick<Project, "id" | "title" | "desc"> & {
  userId: string;
};

export type NewProjectType = Pick<Project, "title" | "desc"> & {
  userId: string;
};

export const fetchProjectsForUser = createAsyncThunk(
  "projects/fetchProjects",
  async (userId: string) => {
    const items = await getProjects(db, userId);

    return items as Array<Project>;
  },
  // third optional argument to prefent  double fetching
  {
    condition(arg, thunkApi) {
      const projectLoadStatus = selectProjectsLoadStatus(
        thunkApi.getState() as RootState
      );
      if (projectLoadStatus !== "idle") {
        return false;
      }
    },
  }
);

export const addNewProject = createAsyncThunk(
  "projects/addNewProject",
  // The payload creator receives the partial `{title, desc, user}` object
  async (initialProject: NewProjectType) => {
    // We send the initial data to the firestore
    // const response = await client.post<Post>("/fakeApi/posts", initialPost);

    const docRef = await addDoc(
      collection(db, `users/user_${initialProject.userId}/projects`),
      {
        title: initialProject.title,
        desc: initialProject.desc,
      }
    );
    // The response includes the complete post object, including unique ID

    return {
      id: docRef.id,
      title: initialProject.title,
      desc: initialProject.desc,
    };
  }
);

const getProjects = async (db: Firestore, userId: string) => {
  const projectsCol = collection(db, `users/user_${userId}/projects`);
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
  extraReducers(builder) {
    builder
      .addCase(logout, (state) => {
        // Clear out the list of projects whenever the user logs out
        return initialState;
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        // We can directly add the new project object to our projects array
        state.projects.push(action.payload as Project);
      })
      .addCase(fetchProjectsForUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchProjectsForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched projects to the array
        state.projects.push(...action.payload);
      })
      .addCase(fetchProjectsForUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});
// Export the auto-generated action creator with the same name

export const { addProject } = projectsSlice.actions;

export const selectAllProjects = (state: RootState) => state.projects.projects;

export const selectProjectById = (state: RootState, projectId: string | null) =>
  state.projects.projects.find((project) => project.id === projectId);

export default projectsSlice.reducer;

export const selectProjectsLoadStatus = (state: RootState) =>
  state.projects.status;
export const selectProjectsLoadError = (state: RootState) =>
  state.projects.error;
