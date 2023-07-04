import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "../../lib/API/auth";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const onSignup = () => {
    router.push({ pathname: "/signUp" });
  };
  const onSignIn = async () => {
    // console.warn("Sign in : ", email);
    try {
      await login({ email });
      router.push({ pathname: "/authenticate", params: { email } });
    } catch (e) {
      const err = e as Error;
      Alert.alert("Error : Please Create An Accound " + err.message);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.label}>Sign in or Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <Pressable style={styles.button} onPress={onSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
      <View style={styles.footer}>
        <Text>Don't have an account?</Text>
        <Pressable onPress={onSignup}>
          <Text style={styles.signuptext}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  label: {
    fontSize: 24,
    marginVertical: 5,
    color: "gray",
  },
  error: {
    marginVertical: 5,
    color: "red",
  },
  input: {
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    fontSize: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#050A12",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    // backgroundColor: "white",
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signuptext: {
    color: "#1d9bf0",
    alignSelf: "center",
  },
});
export default SignIn;
