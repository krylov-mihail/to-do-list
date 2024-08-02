import {
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TodosList } from "@/features/todos/todosList";

import * as React from "react";
import { auth } from "../firebase.Config.js";
import { Button, TextInput } from "react-native-paper";

import { StyleSheet } from "react-native";

/*import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });*/
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
  /*label: {
      color: theme.colors.secondary,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },*/
});

export default function Index() {
  const user = auth.currentUser;

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
  };

  if (!user) {
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
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
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
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>Welcome {user.email}</Text>
      <TodosList />
    </View>
  );
}
