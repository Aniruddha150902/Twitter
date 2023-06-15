import { Text } from "../../../../../components/Themed";
import Tweet from "../../../../../components/Tweet";
import tweets from "../../../../../assets/data/tweets";
import { useSearchParams } from "expo-router";
export default () => {
  const { id } = useSearchParams();
  const tweet = tweets.find((t) => t.id === id);
  if (!tweet) return <Text>Tweet {id} not found!</Text>;
  return <Tweet tweet={tweet} />;
};
// a separate file is required to navigate to an other page to which we will send the id
// this is because we can easily perform deep linking in applications
// npx uri-scheme open exp://192.168.0.165:19000/--/tweet/t0 --a
