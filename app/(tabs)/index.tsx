import useTheme from "@/hooks/useTheme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const index = () => {
  const { toggleDarkMode } = useTheme();

  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => {
          toggleDarkMode();
        }}
      >
        Click to change theme
      </TouchableOpacity>
    </View>
  );
};

export default index;
