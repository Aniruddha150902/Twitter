import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useUserApi } from "../../lib/API/user";
import useColorStyles from "../../Theme";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
const EditProfile = () => {
  const { backgroundColor, textColor } = useColorStyles();
  //@ts-ignore
  const { user, editUser } = useUserApi();
  const id = user.id;
  const [name, setName] = useState(`${user.name}`);
  const [image, setImage] = useState(`${user.image}`);
  const [bio, setBio] = useState(`${user.bio}`);
  const router = useRouter();
  const onEdit = async () => {
    try {
      await editUser({ id: id, name: name, bio: bio, image: image });
      router.back();
    } catch (e) {
      const err = e as Error;
      Alert.alert("Error : Cannot Edit The User Profile" + err.message);
    }
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
    <View style={[styles.mainContainer, { backgroundColor: backgroundColor }]}>
      <View style={styles.imageContainer}>
        <Pressable onPress={pickImageAsync}>
          <Image source={{ uri: image }} style={styles.image} />
        </Pressable>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, { color: textColor }]}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, { color: textColor }]}
          value={bio}
          onChangeText={setBio}
        />
      </View>
      <Pressable
        onPress={onEdit}
        style={[styles.editButton, { backgroundColor: textColor }]}
      >
        <Text style={[styles.editText, { color: backgroundColor }]}>Edit</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 50,
  },
  imageContainer: {
    alignSelf: "center",
  },
  image: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 40,
  },
  nameContainer: { paddingVertical: 30 },
  bioContainer: {},
  label: {
    color: "gray",
  },
  input: {
    fontSize: 25,
    padding: 1,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  editButton: {
    margin: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: 100,
    alignSelf: "center",
  },
  editText: {
    fontWeight: "600",
    fontSize: 16,
    alignSelf: "center",
  },
});
export default EditProfile;
