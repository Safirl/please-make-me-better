import { useStorage } from "@/storage/store";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
// import { Circle } from "./components/circle";
import React from "react";
import { AsyncSkia } from "../skiaAsync/async-skia";

const Iridescence = React.lazy(() => import("./components/circle"));

export const WheelParameter = () => {
    const text = useStorage((state: any) => state.text)
    useEffect(() => {
    })
    const onChangeText = useStorage((state: any) => {
        return state.updateText
    })
    return (
        <>
            <View>
                <React.Suspense fallback={<ActivityIndicator />}>
                    <AsyncSkia/>
                    <Iridescence/>
                </React.Suspense>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});