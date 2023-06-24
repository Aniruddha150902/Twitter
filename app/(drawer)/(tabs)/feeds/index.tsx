import {
  StyleSheet,
  View,
  FlatList,
  useColorScheme,
  ActivityIndicator,
  Text,
} from "react-native";
import { Link } from "expo-router";
// import tweets from "../../../../assets/data/tweets";
import Tweet from "../../../../components/Tweet";
import { Entypo } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
import listTweets from "../../../../lib/API/tweets";
import { useQuery } from "@tanstack/react-query";
// import tweets from "../../../../assets/data/tweets";
export default function FeedScreen() {
  const colorScheme = useColorScheme();
  // Determine the background color based on the color scheme
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  // Determine the text color based on the color scheme
  const textColor = colorScheme === "dark" ? "white" : "black";
  const { data, isLoading, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: listTweets,
  });
  // const [tweets, setTweets] = useState([]);
  // useEffect(() => {
  //   const fetchTweets = async () => {
  //     const res = await listTweets();
  //     setTweets(res);
  //   };
  //   fetchTweets();
  // }, []);
  if (isLoading) return <ActivityIndicator />;
  if (error instanceof Error) return <Text>{error.message}</Text>;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}
    >
      <FlatList
        data={data}
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
