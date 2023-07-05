import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import useColorStyles from "../../Theme/index";
import { Entypo } from "@expo/vector-icons";
import { useUserApi } from "../../lib/API/user";
import { useQuery } from "@tanstack/react-query";
import Tweet from "../../components/Tweet";
import { useRouter } from "expo-router";
const Profile = () => {
  const { backgroundColor, textColor } = useColorStyles();
  const router = useRouter();
  //@ts-ignore
  const { user, getUserTweet } = useUserApi();
  const id = user.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["User", id],
    queryFn: () => getUserTweet(id as String),
    // refetchOnWindowFocus: "always",
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
  if (isLoading) return <ActivityIndicator />;
  if (error instanceof Error) return <Text>{error.message}</Text>;
  if (!data) return <Text>User {id} not found!</Text>;
  if (!data.tweet) return <Text>No Tweets Found!</Text>;
  const onEdit = () => {
    router.push({
      pathname: "/(drawer)/EditProfile",
    });
  };
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
                <View style={styles.bodyContainer}>
                  <Text style={[styles.name, { color: textColor }]}>
                    {data.name}
                  </Text>
                  <Pressable
                    onPress={onEdit}
                    style={[styles.editButton, { backgroundColor: textColor }]}
                  >
                    <Text style={[styles.editText, { color: backgroundColor }]}>
                      Edit Profile
                    </Text>
                  </Pressable>
                </View>
                <Text style={styles.username}>{data.username}</Text>
                <Text style={[styles.bio, { color: textColor }]}>
                  {data.bio}
                </Text>
                <Text style={styles.date}>{data.createdAt}</Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.tweetContainer,
              { backgroundColor: backgroundColor },
            ]}
          >
            <Text style={[styles.tweettext, { color: textColor }]}>Tweets</Text>
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
  bodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    // width: "100%",
  },
  tweettext: {
    alignSelf: "center",
    fontSize: 25,
  },
  editButton: {
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: "34%",
    height: 35,
  },
  editText: {
    fontWeight: "600",
    fontSize: 16,
    alignSelf: "center",
  },
});
export default Profile;
