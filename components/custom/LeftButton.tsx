import { Style } from "@/components/custom/Style";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { IconButton } from "react-native-paper";

export default function LeftButton(props: any) {
  return (
    <IconButton
      icon="arrow-left"
      iconColor={Colors.black}
      size={24}
      style={Style.left_button}
      onPress={() => {
        router.back();
      }}
      {...props}
    />
  );
}
