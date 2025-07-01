import { Style } from "@/components/custom/Style";
import React from "react";
import { Text } from "react-native";

export default function TextLabel(props: any) {
  const { title, required = false } = props;

  return (
    <Text style={Style.text_input_label}>
      {title} {required && <Text style={Style.text_asterisk}>*</Text>}
    </Text>
  );
}
