import { Style } from "@/components/custom/Style";
import { Colors } from "@/constants/Colors";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

type Attribute = {
  size?: number;
};

export default function LoadingIndicator(props: Attribute) {
  const { size = 0 } = props;

  return (
    <View style={Style.indicator_area}>
      <ActivityIndicator size={size} color={Colors.blue} />
    </View>
  );
}
