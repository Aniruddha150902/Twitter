//// @ts-nocheck
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Text, useColorScheme } from "react-native";
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
  const colorScheme = useColorScheme();
  // Determine the background color based on the color scheme
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  // Determine the text color based on the color scheme
  const textColor = colorScheme === "dark" ? "white" : "black";
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{ alignSelf: "center", fontSize: 20, color: textColor }}>
        Elon Musk
      </Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
export default () => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="(tabs)"
          options={{ title: "Home", headerShown: false }}
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
    </ThemeProvider>
  );
};
