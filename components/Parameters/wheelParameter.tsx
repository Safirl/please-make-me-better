import { LayoutChangeEvent, StyleSheet, View } from "react-native";
// import { Circle } from "./components/circle";
import React, { useRef } from "react";
import { useSharedValue } from "react-native-reanimated";
import Circle from "./components/circle";

// const Circle = React.lazy(() => import("./components/circle"));

export const WheelParameter = () => {
    const viewRef = useRef(null)
    const width = useSharedValue(0)
    const height = useSharedValue(0)

    const onLayout = (event: LayoutChangeEvent) => {
        console.log("event", event)
        // setDimensions({width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height})
        width.set(event.nativeEvent.layout.width)
        height.set(event.nativeEvent.layout.height)
    }

    return (
        <>
            <View onLayout={onLayout} style={styles.container}>
                    {/* <AsyncSkia/> */}
                    <Circle/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 200
    }
});