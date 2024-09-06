import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// make alias for greater readability
import { User as FirebaseUser } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore/lite";
import { app as FirebaseApp } from "@/firebase.Config";

const db = getFirestore(FirebaseApp);

export interface User {
  email: string;
  id: string;
}

type NewUser = Pick<User, "email" | "id">;
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//const auth = getAuth();

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  // The payload creator receives the partial `{title, desc, user}` object
  async (initialUser: NewUser) => {
    // We send the initial data to the firestore
    // const response = await client.post<Post>("/fakeApi/posts", initialPost);
    console.log("-----------", "initial User", initialUser);
    await setDoc(doc(db, "users", `user_${initialUser.id}`), {
      email: initialUser.email,
      points: 0,
    });

    // The response includes the complete post object, including unique ID

    console.log("user_id", initialUser.id);

    return {
      id: initialUser.id,
      email: initialUser.email,
    };
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, (state, action) => {})
      .addCase(addNewUser.fulfilled, (state, action) => {
        // state.status = "succeeded";
      })
      .addCase(addNewUser.rejected, (state, action) => {
        // failed to create the user
      });
  },
});
export const { login, logout, updateLoadState } = userSlice.actions;

export const selectUser = (state: { user: { user: any } }) => state.user.user;
export const getLoadState = (state: { user: { dataLoaded: boolean } }) =>
  state.user.dataLoaded;

export default userSlice.reducer;
