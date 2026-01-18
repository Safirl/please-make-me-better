import fonts from "@/assets/styles/fonts"
import { ComposedTrait, Trait } from "@/data/characters"
import { usePersonalityStorage } from "@/storage/store"
import { primaryColorTokens } from "@/tokens/primary/colors.tokens"
import SvgComponent from "@/ui/svg"
import { Blur, center } from "@shopify/react-native-skia"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Animated, { Easing, useAnimatedReaction, useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from "react-native-reanimated"

interface NewTraitProps {
    traitId: number
    animate: boolean
}

const SceneNewTrait = (props: NewTraitProps) => {
    const {traitId, animate} = props
    const composedTraits = usePersonalityStorage((state) => state.composedTraits)
    const [currentTrait, setCurrentTrait] = useState<ComposedTrait>()
    const opacity = useSharedValue(0)
    const traitScale = useSharedValue(1)
    const backgroundTranslate = useSharedValue(300)


    useEffect(() => {
        setCurrentTrait(composedTraits.find(t => t.id === traitId))
    }, [traitId])

    useEffect(() => {
        if (!currentTrait) return;
        opacity.value = animate ? withTiming(1, {duration: 1000, easing: Easing.inOut(Easing.exp)}) : withSpring(0)
        backgroundTranslate.value = withSequence(withTiming(200, {duration: 2000, easing: Easing.inOut(Easing.ease)}, () => scaleUpTrait()), withDelay(500, withTiming(600, {duration: 2000,  easing: Easing.inOut(Easing.ease)}, () => completeAnimation())))
    }, [animate])

    const scaleUpTrait = () => {
        traitScale.value = withDelay(1000, withTiming(1.1, {duration: 2500, easing: Easing.inOut(Easing.ease)}))
    }

    const completeAnimation = () => {
        opacity.value = withTiming(0, {duration: 1000, easing: Easing.inOut(Easing.exp)})
    }

    const animatedContainerStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    const animatedTraitStyle = useAnimatedStyle(() => ({
        transform: [{scale: traitScale.value}]
    }))

    const animatedBackgroundtyle = useAnimatedStyle(() => ({
        transform: [{translateY: backgroundTranslate.value}]
    }))

    if (!currentTrait) return (<></>)

    return (
        <Animated.View style={[styles.container, animatedContainerStyle]}>
            <Text style={styles.text}>
                {currentTrait?.label}
            </Text>
            <Animated.View style={[styles.trait, animatedTraitStyle]}>
                <SvgComponent style={{transform: [{scale: 4}]}} name={currentTrait.icon}></SvgComponent>
            </Animated.View>
            <Animated.View style={[styles.background, animatedBackgroundtyle]}>
                <View style={styles.backgroundCenter}>
                </View>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        // zIndex: 200,
        // backgroundColor: "red",
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
        transform: [{translateY: 300}],
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