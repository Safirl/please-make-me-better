import Modal from "@/components/Modal/modal";
import { CursorParameter } from "@/components/Parameters/cursorParameter";
import { WordParameter } from "@/components/Parameters/wordParameter";
import { Text } from "@react-navigation/elements";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { useStorage } from "../storage/store";
import Button from "@/ui/Button";
import Helpers from "./utils/Helpers";
import Svg, { Circle } from "react-native-svg";
import { StyleSheet } from "react-native";


const dimensions = Dimensions.get("window")

export default function Index() {
  const currentParameter: string = useStorage((state: any) => state.currentParameter)
  const setCurrentParameter = useStorage((state: any) => state.setCurrentParameter)

  console.log("dimensions", dimensions.width)
  useEffect(() => {
    if (!Helpers.isDevMode) return;
    let root = Helpers.instance.getGUIFolder();
    let folder = root.addFolder("Parameter");
    // Helpers.instance.tweak()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}
    >
      <View style={styles.button1}>
        <Button type="tertiary" label="Memories" icon={{name: "memory"}} onPress={() => router.navigate("/memoriesPage")}/>
      </View>

      <View style={styles.button2}>
        <Button type="tertiary" label="Emotions" icon={{name: "emotion"}} onPress={() => router.navigate("/memoriesPage")}/>
      </View> 

      <View style={styles.button3}>
        <Button type="tertiary" label="Personality" icon={{name: "personality"}} onPress={() => router.navigate("/memoriesPage")}/>
      </View>     
      
      <Svg
        style={styles.circle}
        width={490}
        height={394}
        fill="none"
      >
        <Circle
          cx={245}
          cy={197}
          r={(dimensions.width/2)*.7}
          stroke="#969696"
          strokeDasharray="11 11"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
    zIndex: -1
  },

  button1: {
    position: "absolute",
    left: "10%",
    top: 20
  },

  button2: {
    position: "absolute",
    left: "10%",
    top: 300
  },

  button3: {
    position: "absolute",
    right: "10%",
  }
})