import { Text, useColorScheme } from "react-native";
import Tweet from "../../../../../components/Tweet";
import { useSearchParams } from "expo-router";
import { View } from "../../../../../components/Themed";
import { useQuery } from "@tanstack/react-query";
import { getTweet } from "../../../../../lib/API/tweets";
export default () => {
  const colorScheme = useColorScheme();
  // Determine the background color based on the color scheme
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  // Determine the text color based on the color scheme
  const textColor = colorScheme === "dark" ? "white" : "black";
  const { id } = useSearchParams();
  const { data } = useQuery({
    queryKey: ["tweet", id],
    queryFn: () => getTweet(id as string),
  });

  if (!data) return <Text>Tweet {id} not found!</Text>;
  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <Tweet tweet={data} />
    </View>
  );
};
// a separate file is required to navigate to an other page to which we will send the id
// this is because we can easily perform deep linking in applications
// npx uri-scheme open exp://192.168.0.165:19000/--/tweet/t0 --a
