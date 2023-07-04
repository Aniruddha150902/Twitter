import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Entypo } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, Image, Alert } from "react-native";
import Colors from "../../../constants/Colors";
import AvatharHeader from "../../../components/AvatharHeader";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export const unstable_settings = {
  initialRouteName: "feeds",
};
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  colour: string;
}) {
  return <Entypo name="home" size={24} color={props.colour} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="feeds"
        options={{
          title: "Feeds",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="code"
              colour={colorScheme === "dark" ? "white" : "black"}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => <AvatharHeader />,
        }}
      />
      {/* <Tabs.Screen
          name="two"
          options={{
            title: "Tab Two",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        /> */}
    </Tabs>
  );
}
