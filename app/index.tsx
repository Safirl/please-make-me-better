import Modal from "@/components/Modal/modal";
import { WheelParameter } from "@/components/Parameters/wheelParameter";
import { Text } from "@react-navigation/elements";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import { useStorage } from "../storage/store";
import Helpers from "./utils/Helpers";

export default function Index() {
  const currentParameter: string = useStorage((state: any) => state.currentParameter)
  const setCurrentParameter = useStorage((state: any) => state.setCurrentParameter)
  const gui = Helpers.instance

  useEffect(() => {
    console.log(gui)
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
          currentParameter === "" && <WheelParameter/>
        }
      </Modal>
      <Pressable onPress={() => {setCurrentParameter("")}}>
        <Text>Open modal</Text>
      </Pressable>
    </View>
  );
}
