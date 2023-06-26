import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { useSearchParams } from "expo-router";
const Authenticate = () => {
  const [code, setCode] = useState("");
  const { email } = useSearchParams();
  const onSignIn = async () => {
    console.warn("Sign in : ", email, code);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Confirm your email</Text>
      <TextInput
        style={styles.input}
        placeholder="Code"
        value={code}
        onChangeText={setCode}
      />
      <Pressable style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>confirm</Text>
      </Pressable>
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
});
export default Authenticate;
