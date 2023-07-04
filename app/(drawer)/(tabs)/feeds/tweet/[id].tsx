import { ActivityIndicator, Text, useColorScheme } from "react-native";
import Tweet from "../../../../../components/Tweet";
import { useSearchParams } from "expo-router";
import { View } from "../../../../../components/Themed";
import { useQuery } from "@tanstack/react-query";
import { useTweetsApi } from "../../../../../lib/API/tweets";
import useColorStyles from "../../../../../Theme";
export default () => {
  const { backgroundColor, textColor } = useColorStyles();
  //@ts-ignore
  const { getTweet } = useTweetsApi();
  const { id } = useSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["tweet", id],
    queryFn: () => getTweet(id as string),
  });
  if (isLoading) return <ActivityIndicator />;
  if (error instanceof Error) return <Text>{error.message}</Text>;
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
