import { Style } from "@/components/custom/Style";
import { Colors } from "@/constants/Colors";
import React from "react";
import { TextInput } from "react-native-paper";

export default function TextInputFlat(props: any) {
  return (
    <TextInput
      mode="flat"
      style={Style.text_input_item}
      contentStyle={Style.text_input_padding}
      underlineColor="transparent"
      cursorColor={Colors.gray}
      {...props}
    />
  );
}
