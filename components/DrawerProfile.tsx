import { Text, Image, Pressable, View, StyleSheet } from "react-native";
import useColorStyles from "../Theme/index";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useUserApi } from "../lib/API/user";
const DrawerProfile = () => {
  const { backgroundColor, textColor } = useColorStyles();
  //@ts-ignore
  const { user } = useUserApi();
  return (
    <Link href={"/(drawer)/profile"} asChild>
      <Pressable style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: user.image }} style={styles.image} />
          <Entypo
            name="dots-three-vertical"
            size={24}
            color={textColor}
            style={styles.menu}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.name, { color: textColor }]}>{user.name}</Text>
          <Text style={styles.username}>{user.username}</Text>
        </View>
      </Pressable>
    </Link>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "grey",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 40,
  },
  menu: {},
  nameContainer: {
    marginTop: 15,
  },
  name: {
    fontSize: 25,
  },
  username: {
    color: "grey",
  },
});
export default DrawerProfile;
