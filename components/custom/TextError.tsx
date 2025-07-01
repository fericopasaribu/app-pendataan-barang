import { Style } from "@/components/custom/Style";
import React from "react";
import { Text } from "react-native";

export default function TextError(props: any) {
  const { message } = props;

  return <Text style={Style.text_error}>{message}</Text>;
}
