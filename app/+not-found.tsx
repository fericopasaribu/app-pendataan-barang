import { Image, View } from "react-native";

import { Style } from "@/components/custom/Style";

export default function NotFoundScreen() {
  return (
    <View style={Style.image_error_area}>
      <Image
        source={require(`@/assets/images/404.png`)}
        style={Style.image_error_contain}
      />
    </View>
  );
}
