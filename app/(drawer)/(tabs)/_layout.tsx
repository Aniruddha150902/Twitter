import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useNavigation } from "expo-router";
import { Pressable, useColorScheme, Image } from "react-native";

import Colors from "../../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const AvatharHeader = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Image
        source={{
          uri: "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok.jpg",
        }}
        style={{ width: 40, aspectRatio: 1, borderRadius: 40, margin: 10 }}
      />
    </Pressable>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
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
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
