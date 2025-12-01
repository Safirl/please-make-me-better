import Modal from "@/components/Modal/modal";
import { CursorParameter } from "@/components/Parameters/cursorParameter";
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
          currentParameter === "" && <CursorParameter/>
        }
      </Modal>
      <Pressable onPress={() => {setCurrentParameter("")}}>
        <Text>Open modal</Text>
      </Pressable>
    </View>
  );
}
