//// @ts-nocheck
import { Text } from "react-native";
import { withLayoutContext, useNavigation } from "expo-router";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
const DrawerNavigation = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigation);
export const unstable_settings = {
  initialRouteName: "(tabs)",
};
// https://github.com/react-navigation/react-navigation/issues/6790
// @ts-ignore
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{ alignSelf: "center", fontSize: 20 }}>Elon Musk</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
export default () => {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="(tabs)"
        options={{ title: "Home", headerShown: false }}
      />
      <Drawer.Screen name="bookmarks" options={{ title: "Bookmarks" }} />
      <Drawer.Screen name="twitter-blue" options={{ title: "Twitter Blue" }} />
    </Drawer>
  );
};
