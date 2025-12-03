// import GL from "@/ui/GL";
import GPU from "@/ui/GPU";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return <>

    <View
      style={{
        position: "fixed",
        zIndex: 10,
        width: "100%",
        height: "100%",
      }}
    >
      <GPU />
    </View>
    <Stack />
  </>;
}
