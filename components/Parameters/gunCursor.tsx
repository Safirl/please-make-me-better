import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import SvgComponent from "@/ui/svg";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";

let sizes = Dimensions.get("screen");

const GunCursor = () => {
    const width = useSharedValue(0)
    const height = useSharedValue(0)
    const top = useSharedValue(sizes.height/2)
    const left = useSharedValue(sizes.width/2)
    const cursorRef = useRef<View>(null);


    useLayoutEffect(() => {
        height.set(cursorRef.current?.getBoundingClientRect().height);
        width.set(cursorRef.current?.getBoundingClientRect().width);
    })

    const panGesture = Gesture.Pan()
        .onBegin((e) => {
            top.value = withTiming(e.absoluteY, {
                duration: 200,
                },
            )
            left.set(withTiming(e.absoluteX, {
                duration: 200
            }))   
        })
        .onUpdate((e) => {
            top.set(e.absoluteY) 
            left.set(e.absoluteX)
            console.log("width: ", width, " height: ", height)
        })

    const animatedCursorStyle = useAnimatedStyle(() => ({
        top: top.get() - height.get()/2,
        left: left.get() - width.get()/2,
      }));

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.cursorContainer, animatedCursorStyle]} ref={cursorRef}>
                <View style={styles.cursor}>
                    <SvgComponent name="circle"></SvgComponent>
                </View>
            </Animated.View>
        </GestureDetector>
    )
}

export default GunCursor;

const styles = StyleSheet.create({
    cursorContainer: {
        position: "absolute",
        padding: 8,
        borderColor: primaryColorTokens["color-white"],
        borderWidth: 1,
        borderRadius: 3,
    },

    cursor: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        height: "auto",
        padding: 24,
        borderRadius: 3,
        backgroundColor: "#39393D",
    },
})