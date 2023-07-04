//@ts-nocheck
import { Image, Pressable, Alert } from "react-native";
import { useUserApi } from "../lib/API/user";
import { useNavigation } from "expo-router";
const AvatharHeader = () => {
  const navigation = useNavigation();
  const { user } = useUserApi();
  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Image
        source={{ uri: user.image }}
        style={{ width: 30, aspectRatio: 1, borderRadius: 40, marginLeft: 10 }}
      />
    </Pressable>
  );
};
export default AvatharHeader;
