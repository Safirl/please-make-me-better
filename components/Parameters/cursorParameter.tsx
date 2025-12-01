import { useSoulStorage } from "@/storage/store";
import { StyleSheet, View } from "react-native";
import { Cursor } from "./components/cursor";

export const CursorParameter = () => {
    const fluidity = useSoulStorage((state: any) => state.fluidity)
    const blur = useSoulStorage((state: any) => state.fluidity)
    const grain = useSoulStorage((state: any) => state.grain)

    return (
        <View style={styles.container}>
            <Cursor />
            <Cursor />
            <Cursor />
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