import fonts from "@/assets/styles/fonts";
import { Trait } from "@/assets/data/characters";
import { usePersonalityStorage } from "@/assets/scripts/storage/useParametersStorage";
import { primaryBackgroundTokens } from "@/assets/tokens/primary/backgrounds.tokens";
import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens";
import TraitButton from "@/ui/Parameters/personality/traitButton";
import SvgComponent from "@/ui/svg";
import { useEffect, useRef, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";

const CIRCLE_RADIUS = 450 / 2;
const TOTAL_ANGLE = 2 * Math.PI
const DIMENSIONS = Dimensions.get("window")

interface sceneSelectProps {
    style: StyleProp<ViewStyle>
}

const SceneSelect = (props: sceneSelectProps) => {
    const traits = usePersonalityStorage((state) => state.traits)
    const alphaSpacing = TOTAL_ANGLE / (traits.length)
    const setContainerPosition = usePersonalityStorage((state) => state.setContainerPosition)
    const rotation = useSharedValue(0)
    const savedPosX = useSharedValue(0)
    const savedPosY = useSharedValue(0)
    const closestTraitId = usePersonalityStorage((state) => state.closestTraitId)
    const createdComposedTraits = usePersonalityStorage((state) => state.createdComposedTraits)
    const selectedTraits = usePersonalityStorage((state) => state.selectedTraits)
    const setClosestTraitId = usePersonalityStorage((state) => state.setClosestTraitId)

    const rotationGesture = Gesture.Pan()
        .onBegin((e) => {
            savedPosX.value = e.absoluteX
            savedPosY.value = e.absoluteY
        })
        .onUpdate((e) => {
            const deltaX = -1 * (e.absoluteX - savedPosX.value)
            const deltaY = -1 * (e.absoluteY - savedPosY.value)
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            savedPosX.value = e.absoluteX
            savedPosY.value = e.absoluteY
            rotation.value = rotation.value + (Math.sign(deltaX) * distance) * Math.PI / 300
            setClosestTraitId(-1)
        })

    useEffect(() => {
        setContainerPosition(DIMENSIONS.width / 2, -60)
    }, [])

    const traitContainerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${(rotation.value / Math.PI) * 180}deg` }],
        }
    });

    useEffect(() => {
        if (createdComposedTraits[0]) {
            resultIcon1Scale.value = withDelay(400, withTiming(1, { easing: Easing.inOut(Easing.back(0.6)), duration: 2500 }))
        }
        if (createdComposedTraits[1]) {
            resultIcon2Scale.value = withDelay(400, withTiming(1, { easing: Easing.inOut(Easing.back(0.6)), duration: 2500 }))
        }
        if (createdComposedTraits[2]) {
            resultIcon3Scale.value = withDelay(400, withTiming(1, { easing: Easing.inOut(Easing.back(0.6)), duration: 2500 }))
        }
    }, [createdComposedTraits[0], createdComposedTraits[1], createdComposedTraits[2]])

    //result icons
    const resultIcon1Scale = useSharedValue(0)
    const animatedResultIcon1 = useAnimatedStyle(() => ({
        transform: [{ scale: resultIcon1Scale.value }]
    }))
    const resultIcon2Scale = useSharedValue(0)
    const animatedResultIcon2 = useAnimatedStyle(() => ({
        transform: [{ scale: resultIcon2Scale.value }]
    }))
    const resultIcon3Scale = useSharedValue(0)
    const animatedResultIcon3 = useAnimatedStyle(() => ({
        transform: [{ scale: resultIcon3Scale.value }]
    }))

    //glow
    const glowWidth = useSharedValue(0)
    const glowHeight = useSharedValue(0)
    const onGlowLayoutHandler = (e: LayoutChangeEvent) => {
        glowWidth.value = e.nativeEvent.layout.width
        glowHeight.value = e.nativeEvent.layout.height
    }

    const isButtonEmpty = (id: number) => createdComposedTraits.find((composedTrait) => composedTrait.traitA === id || composedTrait.traitB === id) !== undefined
    const getCurrentLabel = () => {
        if (closestTraitId != -1) {
            if (isButtonEmpty(closestTraitId))
                return "XXX"
            else
                return traits[closestTraitId].label
        }

        return "?"
    }

    return (
        <>
            <View style={[styles.container, props.style]}>
                <Text style={styles.count}>
                    {
                        selectedTraits[0] && selectedTraits[1] && 2
                        ||
                        selectedTraits[0] && !selectedTraits[1] && 1
                        ||
                        !selectedTraits[0] && 0
                    }
                    /2
                </Text>
                <View style={styles.selectContainer}>
                    <Text style={styles.trait}>
                        {getCurrentLabel()}
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
                            emptyButton={isButtonEmpty(trait.id)}
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
                    <Text style={{ ...fonts.paragraph, color: primaryColorTokens["color-tertiary-lower"] }}>
                        Drag two traits down to create a new one
                    </Text>
                </View>
            </View>

            <View style={styles.resultContainer}>
                <View style={styles.resultIconContainer}>
                    {
                        createdComposedTraits[0] &&
                        <Animated.View style={[styles.resultIcon, animatedResultIcon1]}>
                            <SvgComponent name={createdComposedTraits[0].icon}></SvgComponent>
                        </Animated.View>
                    }
                </View>
                <View style={styles.resultIconContainer}>
                    {
                        createdComposedTraits[1] &&
                        <Animated.View style={[styles.resultIcon, animatedResultIcon2]}>
                            <SvgComponent name={createdComposedTraits[1].icon}></SvgComponent>
                        </Animated.View>
                    }
                </View>
                <View style={styles.resultIconContainer}>
                    {
                        createdComposedTraits[2] &&
                        <Animated.View style={[styles.resultIcon, animatedResultIcon3]}>
                            <SvgComponent name={createdComposedTraits[2].icon}></SvgComponent>
                        </Animated.View>
                    }
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
        width: "100%",
    },
    traitContainer: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: CIRCLE_RADIUS * 2 + 100,
        width: CIRCLE_RADIUS * 2 + 100,
        left: DIMENSIONS.width / 2 - CIRCLE_RADIUS - 50,
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
        bottom: -72,
        alignItems: "center",
    },
    dropZoneMask: {
        position: "absolute",
        width: "100%",
        height: 160,
        backgroundColor: primaryBackgroundTokens["background-secondary"]
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
    },

    resultContainer: {
        zIndex: 200,
        bottom: 0,
        left: 0,
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        gap: 12,
        marginLeft: 32,
        marginBottom: 32
    },
    resultIconContainer: {
        borderColor: primaryColorTokens["color-tertiary-lower"],
        borderWidth: 1,
        width: 40,
        height: 40,
        borderRadius: 200,
    },
    resultIcon: {
        // borderColor: primaryColorTokens["color-tertiary-lower"],
        // borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: primaryColorTokens["color-primary-medium"],
        height: "100%",
        width: "100%",
        borderRadius: 200
    },
})

export default SceneSelect;