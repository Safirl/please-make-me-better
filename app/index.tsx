import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import Button from "@/ui/Button";
import Helpers from "./utils/Helpers";
import Svg, { Circle } from "react-native-svg";
import { StyleSheet } from "react-native";
import { Href } from "expo-router";
import { useProgressStorage } from "@/assets/scripts/storage/useGameProgressStorage";

import { Easing, Pressable, View } from "react-native";



// < Redirect href = { ""} ></Redirect>
export default function Index() {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >

      <Pressable
        style={{
          position: "absolute",
          zIndex: 99999999999999,
          height: "100%",
          width: "100%",
          backgroundColor: "red",
          opacity: 0
        }}
        onPress={() => {
          router.navigate("/(pages)/titlePage")
        }}
      ></Pressable>
    </View>


  )
}