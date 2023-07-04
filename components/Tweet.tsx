import { View, Text, Image, StyleSheet, Pressable } from "react-native";
// import tweets from "../assets/data/tweets";
import { tweetType } from "../types";
import { Entypo } from "@expo/vector-icons";
import IconButton from "./IconButtton";
import { Link } from "expo-router";
import useColorStyles from "../Theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
type propsType = {
  tweet: tweetType;
  // a:string
};
const Tweet = ({ tweet /*,a*/ }: propsType /*:{tweet:any}*/) => {
  const { backgroundColor, textColor } = useColorStyles();
  return (
    <Link href={`/feeds/tweet/${tweet.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{ uri: tweet.user.image }} style={styles.userimage} />
        <View style={styles.maincontainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "600", color: textColor }}>
              {tweet.user.name}
            </Text>
            <Text style={styles.username}>{tweet.user.username} · 2h</Text>
            <Entypo
              name="dots-three-horizontal"
              size={16}
              color="grey"
              marginLeft="auto"
            />
          </View>
          <Text style={{ lineHeight: 20, marginTop: 5, color: textColor }}>
            {tweet.content}
          </Text>
          {tweet.image && (
            <Image source={{ uri: tweet.image }} style={styles.image} />
          )}
          <View style={styles.footer}>
            <IconButton icon={"comment"} text={tweet.numberOfComments || 0} />
            <IconButton icon={"retweet"} text={tweet.numberOfRetweets || 0} />
            <IconButton icon={"heart"} text={tweet.numberOfLikes || 0} />
            <IconButton icon={"chart"} text={tweet.impressions || 0} />
            <IconButton icon={"share-apple"} />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgrey",
  },
  userimage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  maincontainer: {
    flex: 1,
    marginLeft: 10,
  },
  // name: {},
  // content: {},
  image: {
    width: "100%",
    // height:'100%',
    aspectRatio: 16 / 9,
    borderRadius: 20,
    marginVertical: 10,
  },
  username: {
    color: "grey",
    marginLeft: 5,
  },
  footer: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
  },
});
export default Tweet;
