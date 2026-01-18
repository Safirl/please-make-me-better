import fonts from "@/assets/styles/fonts";
import { Trait } from "@/data/characters";
import { usePersonalityStorage } from "@/storage/store";
import { primaryBackgroundTokens } from "@/tokens/primary/backgrounds.tokens";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import MergeZone from "@/ui/Parameters/personality/mergeZone";
import PersonalityCard from "@/ui/Parameters/personality/PersonalityCard";
import SceneComposed from "@/ui/Parameters/personality/sceneComposed";
import SceneSelect from "@/ui/Parameters/personality/sceneSelect";
import TraitButton from "@/ui/Parameters/personality/traitButton";
import { useEffect, useRef, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, View, Text } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { RotationGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/rotationGesture";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";

const CIRCLE_RADIUS = 450/2;
const TOTAL_ANGLE = 2*Math.PI
const DIMENSIONS = Dimensions.get("window")


const personalityParameters = () => {

    const composedTraits = usePersonalityStorage((state) => state.selectedTraits)
    const SceneSelectContainerOpacity = useSharedValue(0)
    const SceneSelectContainerTop = useSharedValue(-DIMENSIONS.height)
    
    const SceneComposedContainerOpacity = useSharedValue(0)
    const SceneComposedContainerTop = useSharedValue(DIMENSIONS.height)

    useEffect(() => {
        if ((composedTraits[0] !== null && composedTraits[1] !== null)) {
            SceneSelectContainerOpacity.value = withSpring(0)
            SceneSelectContainerTop.value = withSpring(-DIMENSIONS.height)
            SceneComposedContainerOpacity.value = withSpring(1)
            SceneComposedContainerTop.value = withSpring(0)
        }
        else {
            SceneSelectContainerOpacity.value = withSpring(1)
            SceneSelectContainerTop.value = withSpring(0)

            SceneComposedContainerOpacity.value = withSpring(0)
            SceneComposedContainerTop.value = withSpring(DIMENSIONS.height)
        }
    }, [composedTraits[0], composedTraits[1]])

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
    <Animated.View style={[{position: "relative"}, sceneSelectedAnimatedStyle]}>
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