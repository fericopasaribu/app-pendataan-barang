import { Style } from "@/components/custom/Style";
import { Colors } from "@/constants/Colors";
import { Strings } from "@/constants/Strings";
import React from "react";
import { Text } from "react-native";
import { Snackbar } from "react-native-paper";

type ToastProps = {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  isError?: boolean;
  [key: string]: any;
};

export default function Toast({
  visible,
  onDismiss,
  message,
  isError = false,
  ...rest
}: ToastProps) {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={Strings.interval}
      style={[
        Style.snackbar,
        { backgroundColor: isError ? Colors.red : Colors.black },
      ]}
      {...rest}>
      <Text style={Style.snackbar_text}>{message}</Text>
    </Snackbar>
  );
}
