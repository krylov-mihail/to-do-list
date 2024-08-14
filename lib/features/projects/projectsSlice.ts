import { createSlice } from "@reduxjs/toolkit";

// Define a TS type for the data we'll be using
export interface Post {
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
      state.projects.push(action.payload);
    },
  },
});
export const { addProject } = projectsSlice.actions;
export const selectUser = (state: { projects: { projects: any } }) =>
  state.projects.projects;
export default projectsSlice.reducer;
