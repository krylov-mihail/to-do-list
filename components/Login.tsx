import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import * as React from "react";
import { auth } from "../firebase.Config.js";

import { Button, TextInput } from "react-native-paper";
import {
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  login,
  logout,
  selectUser,
  getLoadState,
  updateLoadState,
} from "@/features/user/userSlice";

import { useSelector, useDispatch } from "react-redux";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function Login() {
  const user = auth.currentUser;

  let currentUser = useSelector(selectUser);
  let dataLoaded = useSelector(getLoadState);
  const dispatch = useDispatch();

  const [username, setUsername] = React.useState({ value: "", error: "" });
  const [pswd, setPswd] = React.useState({ value: "", error: "" });

  const emailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return "Email cannot be empty.";
    if (!re.test(email)) return "Invalid email address provided";

    return "";
  };

  const passwordValidator = (password: string) => {
    if (!password || password.length <= 0) return "Password cannot be empty.";

    return "";
  };

  const _onLoginPressed = () => {
    const emailError = emailValidator(username.value);
    const passwordError = passwordValidator(pswd.value);

    if (emailError || passwordError) {
      setUsername({ ...username, error: emailError });
      setPswd({ ...pswd, error: passwordError });
      return;
    }

    /*process login logic*/

    signInWithEmailAndPassword(auth, username.value, pswd.value)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);

        dispatch(
          login({
            user: {
              email: userCredential.user.email,
              displayName: userCredential.user.displayName,
              emailVerified: userCredential.user.emailVerified,
              phoneNumber: userCredential.user.phoneNumber,
              photoURL: userCredential.user.photoURL,
              uid: userCredential.user.uid,
            },
          })
        );
        //const user = ;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
      });
  };

  onAuthStateChanged(auth, (user) => {
    dispatch(updateLoadState());

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // dispatch(login({ user: user }));
      // ...
      console.log("signed in");

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

      console.log("signed out");
    }
  });

  const _onSignUpPressed = () => {
    const emailError = emailValidator(username.value);
    const passwordError = passwordValidator(pswd.value);

    if (emailError || passwordError) {
      setUsername({ ...username, error: emailError });
      setPswd({ ...pswd, error: passwordError });
      return;
    }

    /*process login logic*/

    createUserWithEmailAndPassword(auth, username.value, pswd.value)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

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
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  if (!dataLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Please login</Text>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        right={username.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      ></TextInput>
      <TextInput
        label="Password"
        returnKeyType="done"
        value={pswd.value}
        onChangeText={(text) => setPswd({ value: text, error: "" })}
        error={!!pswd.error}
        right={pswd.error}
        secureTextEntry={true}
      ></TextInput>
      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <Button mode="contained" onPress={_onSignUpPressed}>
          Sign Up
        </Button>

        {/*<TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: "green",
  },
  link: {
    fontWeight: "bold",
    color: "blue",
  },
});
