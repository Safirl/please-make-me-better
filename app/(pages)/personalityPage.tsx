import SceneComposed from "@/ui/Parameters/personality/sceneComposed";
import SceneSelect from "@/ui/Parameters/personality/sceneSelect";
import { usePersonalityStorage } from "@/assets/scripts/storage/store";
import { useEffect, useRef, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, View, Text } from "react-native";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { router } from "expo-router";
import Button from "@/ui/Button";
import SvgComponent from "@/ui/svg";
import { useParametersProgressStorage } from "@/assets/scripts/storage/useParametersProgressStorage";

const DIMENSIONS = Dimensions.get("window")

const personalityParameters = () => {
    const setCurrentParameter = useParametersProgressStorage((state) => state.setCurrentParameter)
    const setHasParameterBeenModified = useParametersProgressStorage((state) => state.setHasParameterBeenModified)
    const selectedTraits = usePersonalityStorage((state) => state.selectedTraits)
    const SceneSelectContainerOpacity = useSharedValue(0)
    const SceneSelectContainerTop = useSharedValue(-DIMENSIONS.height)

    const SceneComposedContainerOpacity = useSharedValue(0)
    const SceneComposedContainerTop = useSharedValue(DIMENSIONS.height)

    useEffect(() => {
        if ((selectedTraits[0] !== null && selectedTraits[1] !== null)) {
            SceneSelectContainerOpacity.value = withSpring(0, { duration: 100 })
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

    useEffect(() => {
        setCurrentParameter("personality")
        setHasParameterBeenModified(true)
    }, [])

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

    const back = () => {
        router.navigate("/configuratorPage")
    }

    return (
        <>
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
            <Animated.View style={[{ position: "relative", height: "100%" }, sceneSelectedAnimatedStyle]}>
                <SceneSelect style={undefined}></SceneSelect>
            </Animated.View>
            <Animated.View style={[styles.composedContainer, sceneComposedAnimatedStyle]}>
                <SceneComposed />
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