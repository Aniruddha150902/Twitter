import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { Link } from "expo-router";
// import tweets from "../../../../assets/data/tweets";
import Tweet from "../../../../components/Tweet";
import { Entypo } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
import { useTweetsApi } from "../../../../lib/API/tweets";
import { useQuery } from "@tanstack/react-query";
// import tweets from "../../../../assets/data/tweets";
import useColorStyles from "../../../../Theme";
export default function FeedScreen() {
  const { backgroundColor, textColor } = useColorStyles();
  //@ts-ignore
  const { listTweets } = useTweetsApi();
  const { data, isLoading, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: listTweets,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
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
        //@ts-ignore
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
