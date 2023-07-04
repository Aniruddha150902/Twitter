import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import useColorStyles from "../../Theme/index";
import { Entypo } from "@expo/vector-icons";
import { useUserApi } from "../../lib/API/user";
import { useQuery } from "@tanstack/react-query";
import Tweet from "../../components/Tweet";

const Profile = () => {
  const { backgroundColor, textColor } = useColorStyles();
  //@ts-ignore
  const { user, getUserTweet } = useUserApi();
  const id = user.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["User", id],
    queryFn: () => getUserTweet(id as String),
  });
  if (isLoading) return <ActivityIndicator />;
  if (error instanceof Error) return <Text>{error.message}</Text>;
  if (!data) return <Text>User {id} not found!</Text>;
  if (!data.tweet) return <Text>No Tweets Found!</Text>;
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={styles.mainContainer}>
            <View
              style={[
                styles.headContainer,
                { backgroundColor: backgroundColor },
              ]}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: `${user.image}`,
                  }}
                  style={styles.image}
                />
                <Entypo
                  name="dots-three-vertical"
                  size={24}
                  color={textColor}
                  style={styles.menu}
                />
              </View>
              <View style={styles.nameContainer}>
                <Text style={[styles.name, { color: textColor }]}>
                  {user.name}
                </Text>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.bio}>{user.bio}</Text>
                <Text style={styles.date}>{user.createdAt}</Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.tweetContainer,
              { backgroundColor: backgroundColor },
            ]}
          >
            <Text
              style={[styles.tweettext, { backgroundColor: backgroundColor }]}
            >
              Tweets
            </Text>
          </View>
        </>
      }
      //@ts-ignore
      data={data.tweet}
      renderItem={({ item }) => <Tweet tweet={item} />}
      style={[styles.tweetContainer, { backgroundColor: backgroundColor }]}
    />
  );
};
const styles = StyleSheet.create({
  mainContainer: {},
  headContainer: {
    padding: 20,
    //   marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 40,
  },
  menu: {},
  nameContainer: {
    marginTop: 15,
  },
  name: {
    fontSize: 25,
  },
  username: {
    color: "grey",
  },
  bio: {
    marginTop: 20,
    marginBottom: 10,
  },
  date: {
    color: "grey",
  },
  tweetContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  tweettext: {
    alignSelf: "center",
    fontSize: 25,
  },
});
export default Profile;
