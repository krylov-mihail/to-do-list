import { StyleSheet } from "react-native";
import * as React from "react";
import { auth } from "@/firebase.Config.js";

import { Avatar, Button, Card, TextInput } from "react-native-paper";
import { Text, View } from "react-native";

import {
  login,
  selectUser,
  getLoadState,
  addNewUser,
} from "@/lib/features/user/userSlice";

import { useSelector } from "react-redux";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAppDispatch } from "@/lib/hooks";

export default function Login() {
  /*const user = auth.currentUser;*/

  let dataLoaded = useSelector(getLoadState);
  //const dispatch = useDispatch();
  const dispatch = useAppDispatch();
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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
      });
  };

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
        // create  user in firestore

        dispatch(addNewUser({ id: user.uid, email: user.email as string }));
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
      }}
    >
      <Card>
        <Card.Title
          title="Welcome to the ToDo list App"
          subtitle="Please login"
          left={(props) => (
            <Avatar.Icon {...props} icon="human-greeting-variant" />
          )}
        />
        <Card.Content>
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
          <Card.Actions>
            <Button mode="contained" onPress={_onLoginPressed}>
              Login
            </Button>

            <Text>OR</Text>
            <Button mode="contained" onPress={_onSignUpPressed}>
              Sign Up
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
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
