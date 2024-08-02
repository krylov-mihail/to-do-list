import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// make alias for greater readability
import { User as FirebaseUser } from "firebase/auth";

//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//const auth = getAuth();

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export const { login, logout } = userSlice.actions;
export const selectUser = (state: { user: { user: any } }) => state.user.user;
export default userSlice.reducer;
