import {
  getLoadState,
  login,
  selectUser,
  updateLoadState,
} from "@/lib/features/user/userSlice";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import Login from "./Login";
import { store } from "@/lib/store";
import { fetchProjectsForUser } from "@/lib/features/projects/projectsSlice";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "@/lib/hooks";
import { auth } from "@/firebase.Config";
import MainApp from "./MainApp";

export default function Main() {
  // is ata loaded from the storage
  let dataLoaded = useSelector(getLoadState);
  const dispatch = useAppDispatch();
  var main = null;
  let currentUser = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(updateLoadState());

      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // dispatch(login({ user: user }));
        // ...
        console.log("Main.tsx line 34: signed in");

        if (!currentUser) {
          dispatch(
            login({
              user: {
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                uid: user.uid,
              },
            })
          );
        }
      } else {
        // User is signed out
        // ...

        console.log("Main.tsx line 34: signed out");
      }
    });
    return unsubscribe;
  }, []);

  if (!dataLoaded) {
    main = (
      <SafeAreaView>
        <ActivityIndicator></ActivityIndicator>
      </SafeAreaView>
    );
  }

  if (!currentUser) {
    main = <Login></Login>;
  } else {
    main = <MainApp></MainApp>;
  }
  return main;
}
