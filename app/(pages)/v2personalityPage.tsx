import { usePersonalityStorage } from "@/storage/store";
import SceneComposed from "@/ui/Parameters/personality/sceneComposed";
import SceneSelect from "@/ui/Parameters/personality/sceneSelect";
import { useEffect, useRef, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, View, Text } from "react-native";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const DIMENSIONS = Dimensions.get("window")

const personalityParameters = () => {

    const selectedTraits = usePersonalityStorage((state) => state.selectedTraits)
    const SceneSelectContainerOpacity = useSharedValue(0)
    const SceneSelectContainerTop = useSharedValue(-DIMENSIONS.height)
    
    const SceneComposedContainerOpacity = useSharedValue(0)
    const SceneComposedContainerTop = useSharedValue(DIMENSIONS.height)

    useEffect(() => {
        if ((selectedTraits[0] !== null && selectedTraits[1] !== null)) {
            SceneSelectContainerOpacity.value = withSpring(0, {duration: 100})
            SceneSelectContainerTop.value = withSpring(-DIMENSIONS.height)
            SceneComposedContainerOpacity.value = withSpring(1)
            SceneComposedContainerTop.value = withSpring(-DIMENSIONS.height)
        }
        else {
            SceneSelectContainerOpacity.value = withSpring(1)
            SceneSelectContainerTop.value = withSpring(0)

            SceneComposedContainerOpacity.value = withSpring(0)
            SceneComposedContainerTop.value = withSpring(DIMENSIONS.height)
        }
    }, [selectedTraits[0], selectedTraits[1]])

    const sceneSelectedAnimatedStyle = useAnimatedStyle(() => (
        {
            top: SceneSelectContainerTop.value,
            opacity: SceneSelectContainerOpacity.value
        }
    ))

    const sceneComposedAnimatedStyle = useAnimatedStyle(() => (
        {
            top: SceneComposedContainerTop.value,
            opacity: SceneComposedContainerOpacity.value
        }
    ))

    return (
    <>
        <Animated.View style={[{position: "relative", height: "100%"}, sceneSelectedAnimatedStyle]}>
            <SceneSelect style={undefined}></SceneSelect>
        </Animated.View>
        <Animated.View style={[styles.composedContainer, sceneComposedAnimatedStyle]}>
            <SceneComposed/>
        </Animated.View>
    </>
    )
}

export default personalityParameters;

const styles = StyleSheet.create({
    composedContainer: {
        height: "100%"
    }
})