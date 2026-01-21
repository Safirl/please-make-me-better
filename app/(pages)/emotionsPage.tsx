import { Cursor } from "@/ui/Parameters/cursor"
import { StyleSheet, View, Text } from "react-native"
import Font from "@/assets/styles/fonts";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Button from "@/ui/Button";
import SvgComponent from "@/ui/svg";
import { router } from "expo-router";
import { useEmotionStorage } from "@/assets/scripts/storage/store";

const OFFSET = 70

const emotionsParameters = () => {
    const emotions = useEmotionStorage((state) => state.emotions)
    const setEmotionIntensity = useEmotionStorage((state) => state.setEmotionIntensity)

    const onValueChanged = (value: number, emotionId: number) => {
        setEmotionIntensity(emotionId, value)
    }
    const back = () => {
        router.navigate("/configuratorPage")
    }

    return (
        <View style={styles.container}>
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

            <Text style={[styles.text, { top: 0, paddingTop: 24 }]}>{emotions[0].label}</Text>
            <Text style={[styles.text, { paddingRight: 340 }]}>{emotions[1].label}</Text>
            <Text style={[styles.text, { bottom: 0, paddingBottom: 24 }]}>{emotions[2].label}</Text>
            <Text style={[styles.text, { paddingLeft: 340 }]}>{emotions[3].label}</Text>
            <Cursor emotionId={emotions[0].id} value={emotions[0].intensity} offsetY={-OFFSET} rotation="vertical+" onValueChanged={onValueChanged}></Cursor>
            <Cursor emotionId={emotions[1].id} value={emotions[1].intensity} offsetX={-OFFSET} rotation="horizontal-" onValueChanged={onValueChanged}></Cursor>
            <Cursor emotionId={emotions[2].id} value={emotions[2].intensity} offsetY={OFFSET} rotation="vertical-" onValueChanged={onValueChanged}></Cursor>
            <Cursor emotionId={emotions[3].id} value={emotions[3].intensity} offsetX={OFFSET} rotation="horizontal+" onValueChanged={onValueChanged}></Cursor>
        </View>
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