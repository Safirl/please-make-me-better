import { Trait } from "@/data/characters";
import { usePersonnalityStorage } from "@/storage/store";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import MergeZone from "@/ui/Parameters/personnality/mergeZone";
import TraitButton from "@/ui/Parameters/personnality/traitButton";
import { useEffect, useRef, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const CIRCLE_RADIUS = 154;
const TOTAL_ANGLE = (Math.PI * 3)/2
const DIMENSIONS = Dimensions.get("window")


const personnalityParameters = () => {
    const traits = usePersonnalityStorage((state) => state.traits)
    const alphaSpacing = TOTAL_ANGLE / (traits.length - 1)
    const createTrait = usePersonnalityStorage((state) => state.createTrait)
    const setContainerPosition = usePersonnalityStorage((state) => state.setContainerPosition)
    const composedTraits = usePersonnalityStorage((state) => state.composedTraits)
    const containerHeight = useSharedValue(0)
    const containerWidth = useSharedValue(0)
    const left = useSharedValue(0)
    const top = useSharedValue(0)
    // const isContainerReady = usePersonnalityStorage((state) => state.isContainerReady)

    const onContainerLayoutHandler = (e: LayoutChangeEvent) => {
        containerHeight.value = e.nativeEvent.layout.height
        containerWidth.value = e.nativeEvent.layout.width
        moveContainer(DIMENSIONS.width/2, DIMENSIONS.height/2)
    }

    useEffect(() => {
        if (composedTraits[0] != null && composedTraits[1] != null) {
            moveContainer(DIMENSIONS.width/2 + 120, DIMENSIONS.height/2)
        }
    }, [composedTraits])

    const moveContainer = (newLeft: number, newTop: number) => {
        left.value = withSpring(newLeft)
        top.value = withSpring(newTop)
        setContainerPosition(newLeft, newTop)
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            top: top.value - containerHeight.value / 2,
            left: left.value - containerWidth.value / 2,
        }
    });

    return (
    <>
    <Animated.View style={[styles.container, animatedStyle]} onLayout={onContainerLayoutHandler}>
        <Svg
            width={308}
            height={308}
            viewBox="0 0 308 308"
            fill="none"
            style={styles.circle}
        >
            <Circle cx={154} cy={154} r={153.5} stroke="url(#a)"/>
            <Defs>
            <LinearGradient
                id="a"
                x1={154}
                x2={154}
                y1={0}
                y2={308}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#BFBFBF" />
                <Stop offset={1} stopColor="#999" stopOpacity={0} />
            </LinearGradient>
            </Defs>
        </Svg>
        {
            <MergeZone />
        }
    </Animated.View>
    {
        // isContainerReady &&
        traits.map((trait) => (
            <TraitButton
                key={trait.id}
                id={trait.id}
                iconName={trait.icon}
                mergeZoneRadius={75}
                alphaSpacing={alphaSpacing}
                totalAngle={TOTAL_ANGLE}
                circleRadius={CIRCLE_RADIUS}
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
    circle: {
        position: "absolute",
        zIndex: 1,
    }
})

export default personnalityParameters;