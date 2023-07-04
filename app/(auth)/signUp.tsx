import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import useColorStyles from "../../Theme";
import { useRouter } from "expo-router";
import { createUser } from "../../lib/API/auth";
const TwitterSignUpPage: React.FC = () => {
  const { backgroundColor, textColor } = useColorStyles();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();
  const onSignUp = async () => {
    try {
      await createUser({ email, name, username, bio });
      router.push({ pathname: "/signIn" });
    } catch (e) {
      const err = e as Error;
      Alert.alert("Error : could not sign in " + err.message);
    }
  };
  const onSignin = () => {
    router.push({ pathname: "/signIn" });
  };
  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <Icon name="twitter" size={96} color="#1DA1F2" style={styles.icon} />
        <Text style={[styles.title, { color: textColor }]}>
          Create your account
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={"grey"}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={"grey"}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"grey"}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Bio"
          placeholderTextColor={"grey"}
          value={bio}
          onChangeText={setBio}
        />
        <Pressable style={styles.button} onPress={onSignUp}>
          <Text style={[styles.buttonText, { color: textColor }]}>Sign Up</Text>
        </Pressable>
      </View>
      <View style={styles.footer}>
        <Text style={{ color: textColor }}>Already have an account?</Text>
        <Pressable onPress={onSignin}>
          <Text style={styles.signuptext}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#1DA1F2",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
export default TwitterSignUpPage;
