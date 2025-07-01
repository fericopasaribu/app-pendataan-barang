import { Style } from "@/components/custom/Style";
import { Colors } from "@/constants/Colors";
import React, { ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PageProps = {
  children: ReactNode;
};

export default function Page({ children }: PageProps) {
  return (
    <View style={Style.page}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blue} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
          <SafeAreaView style={Style.safe_area}>{children}</SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
