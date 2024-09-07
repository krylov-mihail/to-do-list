import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// make alias for greater readability
import { User as FirebaseUser } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore/lite";
import { app as FirebaseApp } from "@/firebase.Config";
import { RootState } from "@/lib/store";

const db = getFirestore(FirebaseApp);

export interface User {
  email: string;
  id: string;
  status: "idle" | "pending" | "succeeded" | "rejected";
  points: number;
  error: null | string;
}

export interface UserDataInterface {
  email: string;
  id: string;
  status: "idle" | "pending" | "succeeded" | "rejected";
  points: number;
  error: null | string;
}
const initialUserData: UserDataInterface = {
  email: "",
  id: "",
  status: "idle",
  points: 0,
  error: null,
};

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

export const fetchDataForUser = createAsyncThunk(
  "users/fetchData",
  async (userId: string) => {
    const item = await getData(db, userId);

    console.log(item);

    return item as { points: number };
  },
  // third optional argument to prefent  double fetching
  {
    condition(arg, thunkApi) {
      const dataFetchStatus = selectDataStatus(
        thunkApi.getState() as RootState
      );
      if (dataFetchStatus !== "idle") {
        return false;
      }
    },
  }
);

const getData = async (db: Firestore, userId: string) => {
  const docRef = doc(db, "users", `user_${userId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    var data = docSnap.data();
    data.id = docSnap.id;
    return data;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
};

export const updatePointsBalance = createAsyncThunk(
  "users/updateBalance",

  async (rewardData: { userId: string; points: number }) => {
    // We send the initial data to the firestore
    const id = rewardData.points;

    console.log("usersSlice 55", `users`, `user_${rewardData.userId}`);
    // get current points

    const docRef = await setDoc(
      doc(db, `users`, `user_${rewardData.userId}`),
      {
        points: rewardData.points,
      },
      { merge: true }
    );
    // The response includes the complete post object, including unique ID

    return {
      id: id,
      points: rewardData.points,
    };
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    data: initialUserData,
    dataLoaded: false,
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.data = initialUserData;
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
      .addCase(fetchDataForUser.fulfilled, (state, action) => {
        state.data = action.payload as UserDataInterface;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        // failed to create the user
      })
      .addCase(updatePointsBalance.fulfilled, (state, action) => {
        // failed to create the user

        console.log("userSlice extra reducers 168 response action", action);
        state.data.points = action.payload.points;
      });
  },
});
export const { login, logout, updateLoadState } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;

export const selectUser = (state: { user: { user: any } }) => state.user.user;
export const getLoadState = (state: { user: { dataLoaded: boolean } }) =>
  state.user.dataLoaded;

export const selectDataStatus = (state: RootState) => state.user.data.status;
export const selectDataError = (state: RootState) => state.user.data.error;

export default userSlice.reducer;
