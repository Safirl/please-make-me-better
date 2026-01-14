import { Trait } from "@/data/characters";
import { usePersonalityStorage } from "@/storage/store";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import MergeZone from "@/ui/Parameters/personality/mergeZone";
import PersonalityCard from "@/ui/Parameters/personality/PersonalityCard";
import TraitButton from "@/ui/Parameters/personality/traitButton";
import { useEffect, useRef, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { RotationGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/rotationGesture";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";

const CIRCLE_RADIUS = 450/2;
const TOTAL_ANGLE = 2*Math.PI
const DIMENSIONS = Dimensions.get("window")


const personalityParameters = () => {
    const traits = usePersonalityStorage((state) => state.traits)
    const alphaSpacing = TOTAL_ANGLE / (traits.length)
    const createTrait = usePersonalityStorage((state) => state.createTrait)
    const setContainerPosition = usePersonalityStorage((state) => state.setContainerPosition)
    const composedTraits = usePersonalityStorage((state) => state.composedTraits)
    const containerHeight = useSharedValue(0)
    const containerWidth = useSharedValue(0)
    const left = useSharedValue(0)
    const top = useSharedValue(0)
    const rotation = useSharedValue(0)
    const savedPosX = useSharedValue(0)
    const savedPosY = useSharedValue(0)
    const setRotation = usePersonalityStorage((state) => state.setRotation)
    // const isContainerReady = usePersonalityStorage((state) => state.isContainerReady)

    const rotationGesture = Gesture.Pan()
        .onUpdate((e) => {
            const deltaX = -1 *(e.absoluteX - savedPosX.value)
            const deltaY = -1 *(e.absoluteY - savedPosY.value)
            const distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY)
            savedPosX.value = e.absoluteX
            savedPosY.value = e.absoluteY
            rotation.value = withSpring(rotation.value + (Math.sign(deltaX) * distance) * Math.PI/100)
        })
        .onEnd((e) => {
            savedPosX.value = 0
            savedPosY.value = 0
        })

    useDerivedValue(() => {
        setRotation(rotation.value)
    });

    const onContainerLayoutHandler = (e: LayoutChangeEvent) => {
        containerHeight.value = e.nativeEvent.layout.height
        containerWidth.value = e.nativeEvent.layout.width
        moveContainer(DIMENSIONS.width/2, DIMENSIONS.height/2)
    }

    useEffect(() => {
        if (composedTraits[0] != null && composedTraits[1] != null) {
            moveContainer(DIMENSIONS.width/2 + 120, DIMENSIONS.height/2)
        }
        else {
            moveContainer(DIMENSIONS.width/2, DIMENSIONS.height/2)
        }
    }, [composedTraits])

    const moveContainer = (newLeft: number, newTop: number) => {
        left.value = withSpring(newLeft)
        top.value = withSpring(newTop)
        setContainerPosition(DIMENSIONS.width/2, DIMENSIONS.height/2)
    }

    useEffect(() => {
        setContainerPosition(DIMENSIONS.width/2, -60)
    }, [])

    const traitContainerAnimatedStyle = useAnimatedStyle(() => {
        return {
            // top: top.value - containerHeight.value / 2,
            // left: left.value - containerWidth.value / 2,
            transform: [{ rotateZ: `${(rotation.value / Math.PI) * 180}deg` }],
        }
    });

    return (
    <>
    <View style={styles.container} onLayout={()=>{}}>
        <GestureDetector gesture={rotationGesture}>
            <Animated.View style={[styles.traitContainer, traitContainerAnimatedStyle]}>   
            </Animated.View>
        </GestureDetector>
        <Svg
            width={28}
            height={36}
            fill="none"
            style={[styles.arrow]}
            >
            <Path
                stroke="#A897FB"
                strokeLinecap="round"
                strokeOpacity={0.6}
                d="M26.773.5 13.636 14.41.5.5m26.273 10.045-13.137 13.91L.5 10.544m26.273 10.046L13.636 34.5.5 20.59"
                />
        </Svg>
    </View>
    {
        traits.map((trait) => (
            <TraitButton
                key={trait.id}
                id={trait.id}
                iconName={trait.icon}
                label={trait.label}
                mergeZoneRadius={75}
                alphaSpacing={alphaSpacing}
                totalAngle={TOTAL_ANGLE}
                circleRadius={CIRCLE_RADIUS}
                scale={2.2}
                enableDrag={false}
            />
        ))
    } 
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    traitContainer: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: CIRCLE_RADIUS*2,
        width: CIRCLE_RADIUS*2,
        left: DIMENSIONS.width/2 - CIRCLE_RADIUS,
        top: -CIRCLE_RADIUS,
        // backgroundColor:"red",
        borderRadius: 300
    },
    circle: {
        position: "absolute",
        zIndex: 1,
    },
    arrow: {
        position: "absolute",
        left: DIMENSIONS.width/2 - 28/2,
        top: 250
    }
})

export default personalityParameters;