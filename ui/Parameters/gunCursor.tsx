import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import SvgComponent from "@/ui/svg";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BlurView } from 'expo-blur';
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Circle, Path, Svg } from "react-native-svg";
import { useMemoryStorage } from "@/storage/store";

interface gunCursorProps {
    onDragEnded: (posX: number, posY: number) => void
}

let sizes = Dimensions.get("screen");

const GunCursor = (props: gunCursorProps) => {
    const setGunPosition = useMemoryStorage((state) => state.setGunPosition)
    
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
            top.set(withSpring(e.absoluteY, {
                duration: 200,
                },
            ))
            left.set(withSpring(e.absoluteX, {
                duration: 200
            }))
            setGunPosition({x: left.value, y: top.value})   
        })
        .onUpdate((e) => {
            top.set(withSpring(e.absoluteY, {
                duration: 200,
                },
            )) 
            left.set(withSpring(e.absoluteX, {
                duration: 200,
                },
            ))
            setGunPosition({x: left.value, y: top.value})   
        })
        .onEnd((e) => {
            props.onDragEnded(left.value, top.value)
        })

    const animatedCursorStyle = useAnimatedStyle(() => ({
        top: top.get() - height.get()/2,
        left: left.get() - width.get()/2,
    }));

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.cursorContainer, animatedCursorStyle]} ref={cursorRef}>

                <View style={styles.lineLeft}/>
                <View style={styles.lineRight}/>
                <View style={styles.lineTop}/>
                <View style={styles.lineBottom}/>

                <View style={styles.cursor}>
                    <Svg
                        width={50}
                        height={50}
                        fill="none"
                    >
                    <Circle cx={25} cy={25} r={24.5} stroke="#F1F1F1" />
                    </Svg>
                </View>
            </Animated.View>
        </GestureDetector>
    )
}

export default GunCursor;

const styles = StyleSheet.create({
    cursorContainer: {
        zIndex: 100,
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
        backgroundColor: primaryColorTokens["color-tertiary-low-transparent"],
    },

   lineRight: {
        position: "absolute",
        top: "50%",
        right: "100%",
        width: 800,
        height: 1,
        backgroundColor: primaryColorTokens["color-tertiary-lower"]
    },
    lineLeft: {
        position: "absolute",
        top: "50%",
        left: "100%",
        width: 800,
        height: 1,
        backgroundColor: primaryColorTokens["color-tertiary-lower"]
    },
    lineTop: {
        position: "absolute",
        left: "50%",
        bottom: "100%",
        width: 1,
        height: 800,
        backgroundColor: primaryColorTokens["color-tertiary-lower"]
    },
    lineBottom: {
        position: "absolute",
        left: "50%",
        top: "100%",
        width: 1,
        height: 800,
        backgroundColor: primaryColorTokens["color-tertiary-lower"]
    }
})