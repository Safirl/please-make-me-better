import { Trait } from "@/assets/data/characters"
import { primaryBackgroundTokens } from "@/assets/tokens/primary/backgrounds.tokens"
import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens"
import { primaryFontTokens } from "@/assets/tokens/primary/font.tokens"
import Button from "@/ui/Button"
import { View, Text, StyleSheet, Dimensions, LayoutChangeEvent } from "react-native"
import { Platform } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import Svg, { Circle } from "react-native-svg"
import Font from "@/assets/styles/fonts";
import { useEffect, useState } from "react"
import { usePersonalityStorage } from "@/assets/scripts/storage/store"

interface PersonalityCardProps {
    trait0: Trait
    trait1: Trait
}

const DIMENSIONS = Dimensions.get("window")

const PersonalityCard = (props: PersonalityCardProps) => {
    const height = useSharedValue(0);
    const opacity = useSharedValue(0)

    const resetTraits = usePersonalityStorage((state) => state.resetTraits)

    const onLayoutHandler = (e: LayoutChangeEvent) => {
        height.value = e.nativeEvent.layout.height;
    }

    useEffect(() => {
        opacity.value = withSpring(1)
    }, [])

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        top: DIMENSIONS.height/2 - height.value/2,
    }))

    return (
        <>
            <Animated.View style={[styles.container, animatedStyle]} onLayout={onLayoutHandler}>
            <View style={styles.subcontainer}>
                <View style={[styles.line]}>
                    <Text style={[styles.content, styles.line1]}>
                        Source: 
                    </Text>
                    <Text style={[styles.tag, styles.content, styles.line1]}>
                        {props.trait0.label}
                    </Text>
                    <Text style={[styles.content, styles.line1]}>
                        +
                    </Text>
                    <Text style={[styles.tag, styles.content, styles.line1]}>
                        {props.trait1.label}
                    </Text>
                </View>
                <View style={styles.line}>
                    <Svg
                        width={7}
                        height={7}
                        fill="none"
                    >
                        <Circle cx={3.5} cy={3.5} r={3.5} fill="#FFA45B" />
                    </Svg>
                    <Text style={styles.content}>
                        nom du nouveau trait 
                    </Text>
                </View>
            </View>
            <View style={styles.line}>
                <Button type="secondary" label="Reject" icon={{name: "cross"}} overridePadding={16} onPress={resetTraits}/>
                <Button type="primary" label="Add" icon={{name: "lightning-bolt"}} overridePadding={42}/>
            </View>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    content: {
        ...Font.paragraph
    },

    container: {
        opacity: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        padding: 18,
        gap: 10,

        position: "absolute",
        left: 42,
        backgroundColor: primaryColorTokens["color-tertiary-medium"],
        borderRadius: 4,
        borderWidth: 1,
        borderColor: primaryColorTokens["color-tertiary-lower"],
    },

    subcontainer: {
        display: "flex",
        alignItems: "flex-start",
        backgroundColor: primaryBackgroundTokens["background-tertiary"],
        borderRadius: 4,
        paddingHorizontal: 14,
        paddingVertical: 8,
        gap: 14
    },

    line: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    line1: {
        color: primaryColorTokens["color-tertiary-lower"]
    },

    tag:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: primaryColorTokens["color-tertiary-medium"],
        borderRadius: 100,

    }
})

export default PersonalityCard