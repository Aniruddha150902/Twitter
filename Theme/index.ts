import { useColorScheme } from "react-native";
const useColorStyles = () => {
  // console.log(tweet.user.image?.toUpperCase())
  const colorScheme = useColorScheme();
  // Determine the background color based on the color scheme
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  // Determine the text color based on the color scheme
  const textColor = colorScheme === "dark" ? "white" : "black";
  return {
    backgroundColor,
    textColor,
  };
};
export default useColorStyles;
