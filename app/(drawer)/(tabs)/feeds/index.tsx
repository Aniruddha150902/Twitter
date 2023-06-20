import { StyleSheet, View, FlatList, useColorScheme } from "react-native";
import { Link } from "expo-router";
import tweets from "../../../../assets/data/tweets";
import Tweet from "../../../../components/Tweet";
import { Entypo } from "@expo/vector-icons";
export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  // Determine the background color based on the color scheme
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  // Determine the text color based on the color scheme
  const textColor = colorScheme === "dark" ? "white" : "black";
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}
    >
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} /*a={"111"}*/ />}
      />
      <Link href={"/newtweet"} asChild>
        <Entypo
          name="plus"
          size={24}
          color="white"
          style={styles.floatingplus}
        />
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  // page: {},
  floatingplus: {
    backgroundColor: "#1D9AF1",
    borderRadius: 25,
    padding: 15,
    position: "absolute",
    right: 15,
    bottom: 15,
    shadowOpacity: 0.25,
    // ShadowRadius: 3.84,
    // ShadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
});
