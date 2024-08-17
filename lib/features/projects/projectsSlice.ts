import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a TS type for the data we'll be using
export interface Project {
  id: string;
  title: string;
  desc: string;
}

const initialState = {
  projects: [
    { id: "1", title: "Language", desc: "Project to help learn new language" },
    { id: "2", title: "Health", desc: "Project to support health" },
  ],
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
