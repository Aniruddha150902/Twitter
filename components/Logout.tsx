import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import useColorStyles from "../Theme";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
const Logout = () => {
  const { backgroundColor, textColor } = useColorStyles();
  const router = useRouter();
  //@ts-ignore
  const { authToken, removeAuthToken } = useAuth();
  const logout = () => {
    removeAuthToken();
    router.push({ pathname: "/signIn" });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={logout}>
      <Icon name="log-out" size={16} color={"#9e9ea0"} style={styles.icon} />
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    color: "#9e9ea0",
  },
  icon: { alignSelf: "center" },
  text: {
    fontSize: 16,
    color: "#9e9ea0",
    alignSelf: "center",
  },
});

export default Logout;
