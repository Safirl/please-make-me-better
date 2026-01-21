import fonts from "@/assets/styles/fonts"
import { ComposedTrait, Trait } from "@/assets/data/characters"
import { usePersonalityStorage } from "@/assets/scripts/storage/store"
import { primaryBackgroundTokens } from "@/assets/tokens/primary/backgrounds.tokens"
import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens"
import SvgComponent from "@/ui/svg"
import { Blur, center } from "@shopify/react-native-skia"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import Animated, { Easing, useAnimatedReaction, useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from "react-native-reanimated"
import { scheduleOnRN } from "react-native-worklets"
interface NewTraitProps {
    traitId: number
    animate: boolean
}

const SceneNewTrait = (props: NewTraitProps) => {
    const { traitId, animate } = props
    const composedTraits = usePersonalityStorage((state) => state.composedTraits)
    const [currentTrait, setCurrentTrait] = useState<ComposedTrait>()
    const opacity = useSharedValue(0)
    const traitScale = useSharedValue(1)
    const backgroundTranslate = useSharedValue(300)
    const resetTraits = usePersonalityStorage((state) => state.resetTraits)
    const createComposedTrait = usePersonalityStorage((state) => state.createComposedTrait)
    const createdComposedTraits = usePersonalityStorage((state) => state.createdComposedTraits)

    useEffect(() => {
        setCurrentTrait(composedTraits.find(t => t.id === traitId))
    }, [traitId])

    // useAnimatedReaction(null, () => {
    /**
     * Essayer ici
     */
    // })
    useEffect(() => {
        if (!currentTrait) return;
        // console.log("animate")
        opacity.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.exp) },
            () => {
                scheduleOnRN(() => opacity.value = withDelay(2000, withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.exp) }, () => {
                    resetTraits(); createComposedTrait(currentTrait);
                })))
            })

        backgroundTranslate.value = withSequence(
            withTiming(200, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
            withTiming(200, { duration: 500, easing: Easing.inOut(Easing.ease) }),
            withTiming(600, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        )

        traitScale.value = withTiming(1.1, { duration: 2500, easing: Easing.inOut(Easing.ease) })

    }, [animate])

    const scaleUpTrait = () => {
        traitScale.value = withDelay(300, withTiming(1.1, { duration: 2500, easing: Easing.inOut(Easing.ease) }))
    }

    const completeAnimation = () => {
        if (!currentTrait) return;

        opacity.value = withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.exp) }, () => {
            setTimeout(() => { resetTraits(); createComposedTrait(currentTrait); }, 200)
        })
    }

    const animatedContainerStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    const animatedTraitStyle = useAnimatedStyle(() => ({
        transform: [{ scale: traitScale.value }]
    }))

    const animatedBackgroundtyle = useAnimatedStyle(() => ({
        transform: [{ translateY: backgroundTranslate.value }]
    }))



    console.log("rerender")


    return (
        <Animated.View style={[styles.container, animatedContainerStyle]}>
            <Text style={styles.text}>
                {currentTrait?.label}
            </Text>
            <Animated.View style={[styles.trait, animatedTraitStyle]}>
                <SvgComponent style={{ transform: [{ scale: 4 }] }} name={currentTrait ? currentTrait.icon : "curieux"}></SvgComponent>
            </Animated.View>
            <Animated.View style={[styles.background, animatedBackgroundtyle]}>
                <View style={styles.backgroundCenter}>
                </View>
            </Animated.View>
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        // zIndex: 200,
        backgroundColor: primaryBackgroundTokens["background-secondary"],
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        width: "100%",
        height: "100%"
    },
    background: {
        position: "absolute",
        width: 600,
        height: 500,
        backgroundColor: primaryColorTokens["color-primary-low"],
        borderRadius: 600,
        filter: "blur(50px)",
        transform: [{ translateY: 300 }],
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundCenter: {
        width: 300,
        height: 250,
        backgroundColor: primaryColorTokens["color-white"],
        borderRadius: 600,
        filter: "blur(50px)",
    },
    text: {
        ...fonts.h1,
        fontSize: 24,
        fontWeight: "bold",
    },
    trait: {
        boxShadow: "0 0 70px 0 rgba(134, 112, 249, 0.79)",
        // position: "absolute",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderColor: primaryColorTokens["color-white"],
        zIndex: 100,
        padding: 10,
        width: 180,
        height: 180,
        borderRadius: 200,
        backgroundColor: primaryColorTokens["color-primary-medium"]
    },
})

export default SceneNewTrait;