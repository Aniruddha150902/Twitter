//// @ts-nocheck
import { useColorScheme, ActivityIndicator, Text, View } from "react-native";
import { withLayoutContext } from "expo-router";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
// import { DrawerActions } from "@react-navigation/native";
import DrawerProfile from "../../components/DrawerProfile";
import { useAuth } from "../../context/AuthContext";
import Logout from "../../components/Logout";
const DrawerNavigation = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigation);
export const unstable_settings = {
  initialRouteName: "(tabs)",
};
// https://github.com/react-navigation/react-navigation/issues/6790
// @ts-ignore
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ flex: 1 }}>
      <DrawerProfile />
      <DrawerItemList {...props} />
      <Logout />
    </DrawerContentScrollView>
  );
}
export default () => {
  const colorScheme = useColorScheme();
  //@ts-ignore
  const { authToken } = useAuth();
  if (!authToken) {
    return <ActivityIndicator />;
  }
  return (
    <Drawer
      drawerContent={(props) => (
        <CustomDrawerContent {...props} style={{ flex: 1 }} />
      )}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{ title: "Home", headerShown: false }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTintColor: colorScheme === "dark" ? "white" : "black",
        }}
      />
      <Drawer.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          headerTintColor: colorScheme === "dark" ? "white" : "black",
        }}
      />
      <Drawer.Screen
        name="twitter-blue"
        options={{
          title: "Twitter Blue",
          headerTintColor: colorScheme === "dark" ? "white" : "black",
        }}
      />
    </Drawer>
  );
};
