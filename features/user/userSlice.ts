import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// make alias for greater readability
import { User as FirebaseUser } from "firebase/auth";

//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//const auth = getAuth();

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    dataLoaded: false,
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateLoadState: (state) => {
      state.dataLoaded = true;
    },
  },
});
export const { login, logout, updateLoadState } = userSlice.actions;

export const selectUser = (state: { user: { user: any } }) => state.user.user;
export const getLoadState = (state: { user: { dataLoaded: boolean } }) =>
  state.user.dataLoaded;

export default userSlice.reducer;
