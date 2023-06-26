import { View, Text, useColorScheme } from "react-native";
import React from "react";
import useColorStyles from "../../Theme";
const TwitterBlue = () => {
  const { backgroundColor, textColor } = useColorStyles();
  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <Text style={{ color: textColor }}>Twitter-Blue</Text>
    </View>
  );
};

export default TwitterBlue;
