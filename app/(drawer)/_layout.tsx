import { withLayoutContext } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
const DrawerNavigation = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigation);
export const unstable_settings = {
  initialRouteName: "(tabs)",
};
export default () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{ title: "Home", headerShown: false }}
      />
      <Drawer.Screen name="bookmarks" options={{ title: "Bookmarks" }} />
      <Drawer.Screen name="twitter-blue" options={{ title: "Twitter Blue" }} />
    </Drawer>
  );
};
