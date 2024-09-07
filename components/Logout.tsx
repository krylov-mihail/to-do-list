import * as React from "react";
import { auth } from "../firebase.Config.js";

import { Button } from "react-native-paper";

import { logout } from "@/lib/features/user/userSlice";

import { useDispatch } from "react-redux";

import { signOut } from "firebase/auth";

export default function Logout() {
  const dispatch = useDispatch();

  const _onSignOutPressed = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(logout());
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Button mode="contained" onPress={_onSignOutPressed}>
      Sign Out
    </Button>
  );
}
