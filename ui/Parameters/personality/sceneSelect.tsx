import fonts from "@/assets/styles/fonts";
import { Trait } from "@/data/characters";
import { usePersonalityStorage } from "@/storage/store";
import { primaryBackgroundTokens } from "@/tokens/primary/backgrounds.tokens";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import MergeZone from "@/ui/Parameters/personality/mergeZone";
import PersonalityCard from "@/ui/Parameters/personality/PersonalityCard";
import TraitButton from "@/ui/Parameters/personality/traitButton";
import { useEffect, useRef, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { RotationGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/rotationGesture";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";

const CIRCLE_RADIUS = 450/2;
const TOTAL_ANGLE = 2*Math.PI
const DIMENSIONS = Dimensions.get("window")

interface sceneSelectProps {
    style: StyleProp<ViewStyle>
}

const SceneSelect = (props: sceneSelectProps) => {
    const traits = usePersonalityStorage((state) => state.traits)
    const alphaSpacing = TOTAL_ANGLE / (traits.length)
    const createTrait = usePersonalityStorage((state) => state.createTrait)
    const setContainerPosition = usePersonalityStorage((state) => state.setContainerPosition)
    const rotation = useSharedValue(0)
    const savedPosX = useSharedValue(0)
    const savedPosY = useSharedValue(0)
    const closestTraitId = usePersonalityStorage((state) => state.closestTraitId)
    const composedTraits = usePersonalityStorage((state) => state.composedTraits)
    const setClosestTraitId = usePersonalityStorage((state) => state.setClosestTraitId)
    
    const rotationGesture = Gesture.Pan()
        .onUpdate((e) => {
            const deltaX = -1 *(e.absoluteX - savedPosX.value)
            const deltaY = -1 *(e.absoluteY - savedPosY.value)
            const distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY)
            savedPosX.value = e.absoluteX
            savedPosY.value = e.absoluteY
            rotation.value = withSpring(rotation.value + (Math.sign(deltaX) * distance) * Math.PI/30)
            setClosestTraitId(-1)
        })
        .onEnd((e) => {
            savedPosX.value = 0
            savedPosY.value = 0
        })

    useEffect(() => {
        setContainerPosition(DIMENSIONS.width/2, -60)
    }, [])

    useEffect(() => {
    }, [closestTraitId])

    const traitContainerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${(rotation.value / Math.PI) * 180}deg` }],
        }
    });

    const glowWidth = useSharedValue(0)
    const glowHeight = useSharedValue(0)
    const onGlowLayoutHandler = (e :LayoutChangeEvent) => {
        glowWidth.value = e.nativeEvent.layout.width
        glowHeight.value = e.nativeEvent.layout.height
    }

    return (
    <>
    <View style={[styles.container, props.style]}>
        <Text style={styles.count}>
            {
                composedTraits[0] && composedTraits[1] && 2
                ||
                composedTraits[0] && !composedTraits[1] && 1
                ||
                !composedTraits[0] && 0
            }
            /2
        </Text>
        <View style={styles.selectContainer}>
            <Text style={styles.trait}>
                {closestTraitId != -1 ? traits[closestTraitId].label : "???"}
            </Text>
            <View style={styles.selectZone}>

            </View>
            <Svg
                width={28}
                height={36}
                fill="none"
                style={styles.arrow}
                >
                <Path
                    stroke="#A897FB"
                    strokeLinecap="round"
                    strokeOpacity={0.6}
                    d="M26.773.5 13.636 14.41.5.5m26.273 10.045-13.137 13.91L.5 10.544m26.273 10.046L13.636 34.5.5 20.59"
                    />
            </Svg>
           
        </View>
        <GestureDetector gesture={rotationGesture}>
            <Animated.View style={[styles.traitContainer, traitContainerAnimatedStyle]}>   
            </Animated.View>
        </GestureDetector>
        {
            traits.map((trait) => (
                <TraitButton
                    key={trait.id}
                    id={trait.id}
                    iconName={trait.icon}
                    label={trait.label}
                    mergeZoneRadius={75}
                    alphaSpacing={alphaSpacing}
                    circleRadius={CIRCLE_RADIUS}
                    scale={2.2}
                    enableDrag={true}
                    rotation={rotation}
                />
            ))
        }
        <View style={styles.dropZone}>
            <View style={styles.glowZone} onLayout={onGlowLayoutHandler}>

            </View>
            <View style={styles.dropZoneMask}>

            </View>
            <View style={styles.dropZoneLight}>

            </View>
            <Text style={{...fonts.paragraph, color: primaryColorTokens["color-tertiary-lower"]}}>
                Drag two traits down to create new one
            </Text>
        </View>
    </View>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
        width: "100%"
    },
    traitContainer: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: CIRCLE_RADIUS*2 + 100,
        width: CIRCLE_RADIUS*2 + 100,
        left: DIMENSIONS.width/2 - CIRCLE_RADIUS - 50,
        top: -CIRCLE_RADIUS,
        // backgroundColor:"red",
        borderRadius: 200
    },
    selectContainer: {
        alignItems: "center",
        paddingTop: 32,
        gap: 16
    },
    trait: {
        ...fonts.paragraph,
        fontSize: 18,
        color: primaryColorTokens["color-primary-medium"],
    },
    selectZone: {
        borderWidth: 1,
        borderRadius: 64,
        borderColor: "#8670F9",
        width: 120,
        height: 120,
        boxShadow: "0 0 26.3px 5px rgba(134, 112, 249, 0.80)"
    },
    dropZone: {
        position: "absolute",
        zIndex: 100,
        width: "100%",
        bottom:-72,
        alignItems: "center",
    },
    dropZoneMask: {
        position: "absolute",
        width: "100%",
        height: 160,
        backgroundColor: primaryBackgroundTokens["background-secondary"]
        // bottom:-42,
        // alignItems: "center"
    },
    dropZoneLight: {
        width: 172,
        paddingBottom: 16,
        borderTopWidth: 1,
        borderColor: primaryColorTokens["color-primary-low"],
    },
    glowZone: {
        position: "absolute",
        boxShadow: "0 0 77.7px #8670F9",
        width: 124,
        height: 124,
        borderRadius: 300,
        // left: "50%"
    },
    count: {
        ...fonts.paragraph,
        color: primaryColorTokens["color-tertiary-lower"],
        paddingTop: 12
    },
    circle: {
        position: "absolute",
        zIndex: 1,
    },
    arrow: {
        paddingTop: 8
    }
})

export default SceneSelect;