//@ts-nocheck
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTweetsApi } from "../lib/API/tweets";
import { useUserApi } from "../lib/API/user";
import useColorStyles from "../Theme";
export default () => {
  const { backgroundColor, textColor } = useColorStyles();
  const [text, setText] = useState("");
  const router = useRouter();
  const { createTweet } = useTweetsApi();
  const queryClient = useQueryClient();
  const { user } = useUserApi();
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: createTweet,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["tweets"],
      // });
      queryClient.setQueriesData(["tweets"], (existingData) => {
        // console.log(data);
        // console.log(existingData);
        return [data, ...existingData];
      });
    },
  });
  const tweetsubmit = async () => {
    try {
      await mutateAsync({ content: text });
      setText("");
      router.back();
    } catch (e) {
      const err = e as Error;
      console.log("Error Posting the tweet : " + err.message);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Link href={"../"}>
            <Text style={{ fontSize: 20, color: textColor }}>Cancel</Text>
          </Link>
          <Pressable onPress={tweetsubmit} style={styles.tweetButton}>
            <Text style={styles.tweetText}>Tweet</Text>
          </Pressable>
        </View>
        {isLoading && <ActivityIndicator />}
        <View style={styles.tweetContainer}>
          <Image source={{ uri: user.image }} style={styles.image} />
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="What's happening?"
            placeholderTextColor={"gray"}
            multiline
            numberOfLines={5}
            style={{
              flex: 1,
              textAlignVertical: "top",
              color: textColor,
            }}
          />
        </View>
        {isError && <Text>"Error Posting the tweet : "+error</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 15,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  tweetButton: {
    backgroundColor: "#1D9AF1",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  tweetText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  tweetContainer: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  // input: {}
});
