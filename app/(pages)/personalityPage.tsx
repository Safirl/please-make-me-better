import SceneComposed from "@/ui/Parameters/personality/sceneComposed";
import SceneSelect from "@/ui/Parameters/personality/sceneSelect";
import { usePersonalityStorage } from "@/assets/scripts/storage/useParametersStorage";
import { useEffect, useRef, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, View, Text } from "react-native";
import Animated, { Easing, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { router } from "expo-router";
import Button from "@/ui/Button";
import SvgComponent from "@/ui/svg";
import { useParametersDisplayStateStorage } from "@/assets/scripts/storage/useParametersProgressStorage";

const DIMENSIONS = Dimensions.get("window")

const personalityParameters = () => {
    const setCurrentParameter = useParametersDisplayStateStorage((state) => state.setCurrentParameter)
    const setHasParameterBeenModified = useParametersDisplayStateStorage((state) => state.setHasParameterBeenModified)
    const selectedTraits = usePersonalityStorage((state) => state.selectedTraits)
    const SceneSelectContainerOpacity = useSharedValue(0)
    const SceneSelectContainerTop = useSharedValue(-DIMENSIONS.height)

    const SceneComposedContainerOpacity = useSharedValue(1)
    const SceneComposedContainerTop = useSharedValue(DIMENSIONS.height)

    useEffect(() => {
        if ((selectedTraits[0] !== null && selectedTraits[1] !== null)) {
            // SceneSelectContainerOpacity.value = withSpring(0, { duration: 100 })
            SceneSelectContainerTop.value = withSpring(-DIMENSIONS.height)
            // SceneComposedContainerOpacity.value = withSpring(1)
            SceneComposedContainerTop.value = withSpring(-DIMENSIONS.height)
        }
        else {
            SceneSelectContainerOpacity.value = withSpring(1)
            SceneSelectContainerTop.value = withSpring(0)

            SceneComposedContainerOpacity.value = withSpring(1)
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
        containerTranslateX.value = withTiming(-DIMENSIONS.width, {duration: 600, easing: Easing.in(Easing.exp)}, () => {
            router.navigate("/configuratorPage")
        })
        // containerTranslateY.value = withTiming(-DIMENSIONS.height, {duration: 800}, () => {
        //     router.navigate("/configuratorPage")
        // })
    }

    const animateAlphaBg = () => {
        alphabgAnimated.value = withTiming(0, { easing: Easing.inOut(Easing.ease), duration: 2500 })
    }
    
    //container
    const alphabgAnimated = useSharedValue(1)
    const containerTranslateX = useSharedValue(0)
    const containerTranslateY = useSharedValue(0)
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: containerTranslateX.value}, {translateY: containerTranslateY.value}],
        backgroundColor: `rgba(29, 30, 34, ${alphabgAnimated.value})`
    }))

    return (
        <Animated.View style={[{height: "100%"}, containerAnimatedStyle]}>
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
                <SceneSelect style={undefined} animateAlphaBg={animateAlphaBg}></SceneSelect>
            </Animated.View>
            <Animated.View style={[styles.composedContainer, sceneComposedAnimatedStyle]}>
                <SceneComposed />
            </Animated.View>
        </Animated.View>
    )
}

export default personalityParameters;

const styles = StyleSheet.create({
    composedContainer: {
        height: "100%"
    }
})