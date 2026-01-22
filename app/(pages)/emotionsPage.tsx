import { Cursor } from "@/ui/Parameters/cursor"
import { StyleSheet, View, Text } from "react-native"
import Font from "@/assets/styles/fonts";
import React, { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Button from "@/ui/Button";
import SvgComponent from "@/ui/svg";
import { router } from "expo-router";
import { useEmotionStorage } from "@/assets/scripts/storage/useParametersStorage";
import { useParametersDisplayStateStorage } from "@/assets/scripts/storage/useParametersProgressStorage";
import Animated, { withSequence, useAnimatedStyle, useSharedValue, withTiming, withDelay } from "react-native-reanimated";

import { Easing } from "react-native"
const OFFSET = 70

const emotionsParameters = () => {
    const setCurrentParameter = useParametersDisplayStateStorage((state) => state.setCurrentParameter)
    const setHasParameterBeenModified = useParametersDisplayStateStorage((state) => state.setHasParameterBeenModified)
    const emotions = useEmotionStorage((state) => state.emotions)
    const setEmotionIntensity = useEmotionStorage((state) => state.setEmotionIntensity)

    const onValueChanged = (value: number, emotionId: number) => {
        setEmotionIntensity(emotionId, value)
    }



    const txt1 = useSharedValue(0)
    const txt2 = useSharedValue(0)
    const txt3 = useSharedValue(0)
    const txt4 = useSharedValue(0)
    const globalOpacity = useSharedValue(1)

    const back = () => {
        const easeOut = Easing.in(Easing.exp)

        globalOpacity.value = withTiming(0, { duration: 500, easing: easeOut })
        setTimeout(() => {
            router.navigate("/configuratorPage")
        }, 500)
    }

    useEffect(() => {
        const easeOut = Easing.out(Easing.exp)

        setCurrentParameter("emotions")
        setHasParameterBeenModified(true)

        txt1.value = withDelay(
            100,
            withTiming(1, { duration: 750, easing: easeOut })
        )
        txt2.value = withDelay(
            170,
            withTiming(1, { duration: 750, easing: easeOut })
        )
        txt3.value = withDelay(
            280,
            withTiming(1, { duration: 750, easing: easeOut })
        )
        txt4.value = withDelay(
            210,
            withTiming(1, { duration: 750, easing: easeOut })
        )
    }, [])

    const text1StyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: txt1.value
        }
    })
    const text2StyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: txt2.value
        }
    })
    const text3StyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: txt3.value
        }
    })
    const text4StyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: txt4.value
        }
    })
    const globalOpacityAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity: globalOpacity.value
        }
    })


    return (
        <Animated.View style={[styles.container, globalOpacityAnimationStyle]}>
            <View
                style={{
                    position: "absolute",
                    top: 24,
                    left: 16,
                    zIndex: 100
                }}
            >
                <Button onPress={back} type="icon">
                    <SvgComponent name="back-chevron" />
                </Button>
            </View>

            <Animated.Text style={[styles.text, { top: 0, paddingTop: 24 }, text1StyleAnimation]}>{emotions[0].label}</Animated.Text>
            <Animated.Text style={[styles.text, { paddingRight: 340 }, text3StyleAnimation]}>{emotions[1].label}</Animated.Text>
            <Animated.Text style={[styles.text, { bottom: 0, paddingBottom: 24 }, text4StyleAnimation]}>{emotions[2].label}</Animated.Text>
            <Animated.Text style={[styles.text, { paddingLeft: 340 }, text2StyleAnimation]}>{emotions[3].label}</Animated.Text>
            <Cursor delay={170} emotionId={emotions[0].id} value={emotions[0].intensity} offsetY={-OFFSET} rotation="vertical+" onValueChanged={onValueChanged}></Cursor>
            <Cursor delay={350} emotionId={emotions[1].id} value={emotions[1].intensity} offsetX={-OFFSET} rotation="horizontal-" onValueChanged={onValueChanged}></Cursor>
            <Cursor delay={280} emotionId={emotions[2].id} value={emotions[2].intensity} offsetY={OFFSET} rotation="vertical-" onValueChanged={onValueChanged}></Cursor>
            <Cursor delay={210} emotionId={emotions[3].id} value={emotions[3].intensity} offsetX={OFFSET} rotation="horizontal+" onValueChanged={onValueChanged}></Cursor>
        </Animated.View>
    )
}

export default emotionsParameters

const styles = StyleSheet.create({
    text: {
        ...Font.paragraph,
        position: "absolute",

    },

    container: {
        height: "100%",
        position: 'relative',
        alignItems: "center",
        justifyContent: "center"
    }
})