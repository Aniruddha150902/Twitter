import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Image,
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
  const [image, setImage] = useState<string>(
    "data:image/png;base64,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"
  );
  const router = useRouter();
  const onSignUp = async () => {
    try {
      await createUser({ email, name, username, bio, image });
      router.push({ pathname: "/signIn" });
    } catch (e) {
      const err = e as Error;
      Alert.alert("Error : could not sign in " + err.message);
    }
  };
  const onSignin = () => {
    router.push({ pathname: "/signIn" });
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      //@ts-ignore
      const newImage = result.assets[0].uri;
      setImage(newImage);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <Icon name="twitter" size={96} color="#1DA1F2" style={styles.icon} />
        <Text style={[styles.title, { color: textColor }]}>
          Create your account
        </Text>
        <Pressable onPress={pickImageAsync} style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </Pressable>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Name"
          placeholderTextColor={"grey"}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Username"
          placeholderTextColor={"grey"}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.input, { color: textColor }]}
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
  imageContainer: {
    alignSelf: "center",
    padding: 30,
  },
  image: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
});
export default TwitterSignUpPage;
