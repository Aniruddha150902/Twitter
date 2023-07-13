import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { View, Image, StyleSheet, Pressable, Text } from "react-native";
import useColorStyles from "../Theme";
import { Ionicons } from "@expo/vector-icons";
export default function AddImage({
  onSetImage,
}: {
  onSetImage: (newToken: string) => null;
}) {
  const { backgroundColor, textColor } = useColorStyles();
  const placeholderImageSource =
    "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg";
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      //@ts-ignore
      const newImage = result.assets[0].uri;
      setSelectedImage(newImage);
      onSetImage(newImage);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.imageContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={pickImageAsync}
        >
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <Image
              source={{ uri: placeholderImageSource }}
              style={styles.image}
            />
          )}
          {/* <Ionicons
            name="images-outline"
            size={30}
            color={textColor}
            style={styles.icon}
          /> */}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  icon: {},
  image: {
    width: "100%",
    // height:'100%',
    aspectRatio: 16 / 9,
    borderRadius: 20,
    marginVertical: 10,
  },
});
