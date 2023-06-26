import { View, Text, useColorScheme } from "react-native";
import React from "react";
import useColorStyles from "../../Theme";
const Bookmarks = () => {
  const { backgroundColor, textColor } = useColorStyles();
  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <Text style={{ color: textColor }}>Bookmarks</Text>
    </View>
  );
};

export default Bookmarks;
