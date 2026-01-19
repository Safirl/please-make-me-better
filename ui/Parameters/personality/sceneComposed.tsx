import { usePersonalityStorage } from "@/assets/scripts/storage/store"
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated"
import { View, Text } from "react-native"
import TraitButton from "./traitButton"
import { useEffect, useState } from "react"
import { Dimensions, StyleSheet } from "react-native"
import fonts from "@/assets/styles/fonts"
import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens"
import SvgComponent from "@/ui/svg"
import Svg, { Path } from "react-native-svg"
import Button from "@/ui/Button"
import { ComposedTrait } from "@/assets/data/characters"
import SceneNewTrait from "./sceneNewTrait"

const SceneComposed = () => {
    const selectedTraits = usePersonalityStorage((state) => state.selectedTraits)
    const resetTraits = usePersonalityStorage((state) => state.resetTraits)
    const composedTraits = usePersonalityStorage((state) => state.composedTraits)
    const [currentComposedTrait, setCurrentComposedTrait] = useState<ComposedTrait>()
    const [animate, setAnimate] = useState(false)
    const opacity = useSharedValue(1)

    useEffect(() => {
        if (!selectedTraits[0] || !selectedTraits[1]) {
            opacity.value = withTiming(1, { duration: 200 })
            setAnimate(false)
            return;
        };

        const currentTrait = composedTraits.find(
            t =>
                [t.traitA, t.traitB].includes(selectedTraits[0]!.id) &&
                [t.traitA, t.traitB].includes(selectedTraits[1]!.id)
        );
        if (!currentTrait) return;

        setCurrentComposedTrait(currentTrait)
    }, [selectedTraits[0], selectedTraits[1]])

    const selectTrait = () => {
        opacity.value = withTiming(0, { duration: 200 })
        setAnimate(true)
    }

    const dynamicStyleLeft = StyleSheet.create({
        style: {
            transform: [{ translateX: 0 }, { scale: 2.2 }],

        }
    })

    const dynamicStyleRight = StyleSheet.create({
        style: {
            transform: [{ translateX: 0 }, { scale: 2.2 }],
        }
    })

    const animatedContainerStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    if (!selectedTraits[0] || !selectedTraits[1] || !currentComposedTrait) {
        return (
            <></>
        )
    }
    return (
        <>
            <SceneNewTrait traitId={currentComposedTrait.id} animate={animate} />
            <Animated.View style={[styles.container, animatedContainerStyle]}>
                <View style={styles.textContainer}>
                    <View style={styles.dot} />
                    <Text style={styles.text}>Nom du nouveau trait : {currentComposedTrait.label}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.middleContainer}>
                    <View style={styles.composedTraitContainer}>
                        <Animated.View style={[styles.trait, dynamicStyleLeft.style]}>
                            <SvgComponent name={selectedTraits[0]?.icon}></SvgComponent>
                        </Animated.View>
                        <Text style={styles.traitText}>
                            {selectedTraits[0]?.label}
                        </Text>
                    </View>
                    <Svg
                        width={15}
                        height={15}
                        fill="none"
                    >
                        <Path
                            stroke="#F1F1F1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M.5 7.5h14m-7-7v14"
                        />
                    </Svg>
                    <View style={styles.composedTraitContainer}>
                        <Animated.View style={[styles.trait, dynamicStyleRight.style]}>
                            <SvgComponent name={selectedTraits[1]?.icon}></SvgComponent>
                        </Animated.View>
                        <Text style={styles.traitText}>
                            {selectedTraits[1]?.label}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button type="tertiary" label="Reject" icon={{ name: "cross" }} onPress={resetTraits} />
                    <Button type="primary" label="Add" icon={{ name: "lightning-bolt" }} onPress={selectTrait} />
                </View>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        padding: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 200,
        backgroundColor: primaryColorTokens["color-primary-medium"]
    },
    text: {
        ...fonts.paragraph
    },
    separator: {
        height: 1,
        width: 306,
        backgroundColor: primaryColorTokens["color-primary-medium"],
    },

    middleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 64,
        marginVertical: 64
    },
    composedTraitContainer: {
        alignItems: "center",
        flexDirection: "column",
        gap: 42,
        transform: [{ translateY: 20 }]
    },
    traitText: {
        ...fonts.paragraph,
        color: primaryColorTokens["color-primary-medium"]
    },

    buttonContainer: {
        flexDirection: "row",
        gap: 8
    },

    trait: {
        width: 44,
        height: 44,
        flexShrink: 0,
        zIndex: 100,
        padding: 10,
        boxShadow: "0 0 9.7px 0 rgba(231, 229, 254, 0.49)",
        borderRadius: 100,
        backgroundColor: primaryColorTokens["color-tertiary-medium"]
    },
})

export default SceneComposed