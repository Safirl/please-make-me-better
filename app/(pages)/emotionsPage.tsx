import { Cursor } from "@/ui/Parameters/cursor"
import { StyleSheet, View, Text } from "react-native"
import Font from "@/assets/styles/fonts";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const OFFSET = 70

const emotionsParameters = () => {
    const onGesture = Gesture.Pan()
        .onBegin((e) => {
            console.log("coucou")
        })


    return (
        <View style={styles.container}>
            <Text style={[styles.text, {top: 0, paddingTop: 24}]}>Colère</Text>
            <Text style={[styles.text, {paddingRight: 340}]}>Colère</Text>
            <Text style={[styles.text, {bottom: 0, paddingBottom: 24}]}>Colère</Text>
            <Text style={[styles.text, {paddingLeft: 340}]}>Colère</Text>
            <Cursor value={0} offsetY={OFFSET} rotation="vertical-" onValueChanged={(value: number)=>{}}></Cursor>
            <Cursor value={0} offsetX={OFFSET} rotation="horizontal+" onValueChanged={(value: number)=>{}}></Cursor>
            <Cursor value={0} offsetY={-OFFSET} rotation="vertical+" onValueChanged={(value: number)=>{}}></Cursor>
            <Cursor value={0} offsetX={-OFFSET} rotation="horizontal-" onValueChanged={(value: number)=>{}}></Cursor>
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