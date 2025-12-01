import { useSoulStorage } from "@/storage/store";
import { StyleSheet, View } from "react-native";
import { Cursor } from "./components/cursor";

export const CursorParameter = () => {
    const fluidity = useSoulStorage((state: any) => state.fluidity)
    const blur = useSoulStorage((state: any) => state.fluidity)
    const grain = useSoulStorage((state: any) => state.grain)

    const setFluidity = useSoulStorage((state: any) => {
        return state.setFluidity
    })

    return (
        <View style={styles.container}>
            <Cursor value={fluidity} onValueChanged={setFluidity}/>
            {/* <Cursor />
            <Cursor /> */}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    gap: 32,
    // width: "100%",
    // height: "100%",
    // backgroundColor: "red",
  },
});