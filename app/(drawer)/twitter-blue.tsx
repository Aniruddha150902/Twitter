import { View, Text, useColorScheme } from "react-native";
import React from "react";

const TwitterBlue = () => {
  const colorScheme = useColorScheme();
  // Determine the background color based on the color scheme
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  // Determine the text color based on the color scheme
  const textColor = colorScheme === "dark" ? "white" : "black";
  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <Text style={{ color: textColor }}>Twitter-Blue</Text>
    </View>
  );
};

export default TwitterBlue;
