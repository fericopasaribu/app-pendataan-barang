import { Style } from "@/components/custom/Style";
import { Colors } from "@/constants/Colors";
import React from "react";
import { IconButton } from "react-native-paper";

export default function RightButton(props: any) {
  return (
    <IconButton
      icon="check"
      iconColor={Colors.black}
      size={24}
      style={Style.right_button}
      {...props}
    />
  );
}
