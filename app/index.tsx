import Modal from "@/components/Modal/modal";
import { CursorParameter } from "@/components/Parameters/cursorParameter";
import { WheelParameter } from "@/components/Parameters/wheelParameter";
import { WordParameter } from "@/components/Parameters/wordParameter";
import { Text } from "@react-navigation/elements";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import { useStorage } from "../storage/store";
import Helpers from "./utils/Helpers";

export default function Index() {
  const currentParameter: string = useStorage((state: any) => state.currentParameter)
  const setCurrentParameter = useStorage((state: any) => state.setCurrentParameter)

  useEffect(() => {
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
      <Modal>
        {
          currentParameter === "cursors" && <CursorParameter/> ||
          currentParameter === "wheel" && <WheelParameter/> ||
          currentParameter === "words" && <WordParameter/>
        }
      </Modal>
      <Pressable onPress={() => {setCurrentParameter("cursors")}}>
        <Text>Open cursors</Text>
      </Pressable>
      <Pressable onPress={() => {setCurrentParameter("wheel")}}>
        <Text>Open cursors</Text>
      </Pressable>
      <Pressable onPress={() => {setCurrentParameter("words")}}>
        <Text>Open words</Text>
      </Pressable>
    </View>
  );
}
