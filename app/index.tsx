import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Pressable, View } from "react-native";
import Button from "@/ui/Button";
import Helpers from "./utils/Helpers";
import Svg, { Circle } from "react-native-svg";
import { StyleSheet } from "react-native";
import { Href } from "expo-router";
import { useProgressStorage } from "@/assets/scripts/storage/useGameProgressStorage";


const dimensions = Dimensions.get("window")

export default function Index() {
  return (<Redirect href={"/(pages)/titlePage"}></Redirect>)
}