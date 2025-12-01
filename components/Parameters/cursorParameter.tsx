import { useSoulStorage, useStorage } from "@/storage/store";
import { Text } from "@react-navigation/elements";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export const CursorParameter = () => {
    const fluidity = useSoulStorage((state: any) => state.fluidity)
    const blur = useSoulStorage((state: any) => state.fluidity)
    const grain = useSoulStorage((state: any) => state.grain)

    const onChangeText = useStorage((state: any) => {
        return state.updateText
    })

    useEffect(() => {
      console.log("coucou")
    })

    return (
        <View style={styles.container}>
            <View style={styles.fillBackground}>
              <Text>Coucou</Text>
              <View style={styles.fill}></View>
              <View className="cursor"></View>
            </View>          
        </View>
    )
}

const styles = StyleSheet.create({
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   padding: 10,
  // },

  container: {
    display: "flex",
    // width: "100%",
    // height: "100%",
    // backgroundColor: "red",
  },

  fillBackground: {
    position: "relative",
    backgroundColor: "red",
    height: 200,
    width: 50,
  },
  
  fill: {
    bottom: 0,
    left: 0,
    position: "absolute",
    height: 100,
    width: 50,
    backgroundColor: "green",
  },

  cursor: {

  }
});