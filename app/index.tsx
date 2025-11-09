import Modal from "@/components/Modal/modal";
import { WheelParameter } from "@/components/Parameters/wheelParameter";
import { Dimensions, View } from "react-native";

const { width, height } = Dimensions.get('window');


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}
    >
      {/* <Text>The current count is {}</Text> */}
      {/* <CursorParameter></CursorParameter> */}
      <Modal modalWidth={200}>
        <WheelParameter/>
      </Modal>
    </View>
  );
}
