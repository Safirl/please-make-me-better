import { useProgressStorage } from "@/assets/scripts/storage/useGameProgressStorage"
import fonts from "@/assets/styles/fonts"
import { primaryBackgroundTokens } from "@/assets/tokens/primary/backgrounds.tokens"
import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens"
import Button from "@/ui/Button"
import { useCallback, useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { texts } from "@/assets/data/endingTexts"
import { useEmotionStorage, useMemoryStorage, usePersonalityStorage } from "@/assets/scripts/storage/useParametersStorage"
import TextAnimatedLine from "@/ui/animations/animatedTexts/AnimatedText";
import { useParametersDisplayStateStorage } from "@/assets/scripts/storage/useParametersProgressStorage"
import { useFocusEffect } from "expo-router"
import { useAnimatedImage } from "@shopify/react-native-skia"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

const EndingPage = () => {
    const choices = useProgressStorage((state) => state.choices)
    const setStep = useProgressStorage((state) => state.setStep)
    const [chosenPath, setChosenPath] = useState({ choice: 0, length: -1 })
    const resetEmotions = useEmotionStorage((state) => state.resetEmotions)
    const resetPersonality = usePersonalityStorage((state) => state.resetPersonality)
    const resetMemories = useMemoryStorage((state) => state.resetMemories)
    const resetParametersProgress = useParametersDisplayStateStorage((state) => state.resetParametersProgress)
    const setChoices = useProgressStorage((state) => state.setChoices)

    useFocusEffect(
        useCallback(() => {
            containerOpacity.value = withTiming(1, {duration: 1200})
        }, [])
    );

    useEffect(() => {
        const paths = [
            { choice: 0, length: choices.filter((choice) => choice === 0).length },
            { choice: 1, length: choices.filter((choice) => choice === 1).length },
            { choice: 2, length: choices.filter((choice) => choice === 2).length }
        ]

        let currentChosenPath = { choice: -1, length: -1 };
        paths.forEach(path => {
            if (path.length > currentChosenPath.length) {
                currentChosenPath = path
            }
        });
        setChosenPath(currentChosenPath)
    }, [choices])

    const handleRetry = () => {
        containerOpacity.value = withTiming(0, {duration: 800}, () => {
            resetExperience()
            setStep("configurator");
        })
    }

    const resetExperience = () => {
        resetEmotions()
        resetMemories()
        resetPersonality()
        resetParametersProgress()
        setChoices([]);
    }

    const containerOpacity = useSharedValue(0)
    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            opacity: containerOpacity.value
        }
    })

    return (
        <View style={styles.container}>
            <Animated.View style={animatedContainerStyle}>
                {/* SVG */}
                <View style={styles.textContainer}>
                    <TextAnimatedLine
                        style={styles.header}
                        text={"Compte rendu"}
                    ></TextAnimatedLine>
                    <TextAnimatedLine
                        style={styles.text}
                        text={`${texts[chosenPath.choice]}`}
                        delay={"Compte rendu".length * 5}
                    ></TextAnimatedLine>
                    <TextAnimatedLine
                        style={[styles.text, { color: primaryColorTokens["color-danger-high"] }]}
                        delay={("Compte rendu".length + `${texts[chosenPath.choice]}`.length) * 5}
                        text={"L’état général du client n’est pas compatible avec sa demande. Le dossier ne peut être considéré comme clos."}
                    ></TextAnimatedLine>
                </View>
            </Animated.View>
            <Animated.View style={[styles.rightContainer, animatedContainerStyle]}>
                <Text style={styles.errorText}>
                //ERREUR//
                </Text>
                <View style={styles.triesContainer}>
                    <View style={styles.triesNumberContainer}>
                        <Text style={styles.triesText}>
                            1
                        </Text>
                        <Text style={styles.triesText}>
                            2
                        </Text>
                        <Text style={styles.triesText}>
                            3
                        </Text>
                    </View>
                    <Text style={{ ...fonts.paragraph, color: primaryColorTokens["color-tertiary-lower"] }}>Tentatives restantes</Text>
                </View>
                <Button label="Rééssayer" type="primary" overridePadding={60} onPress={handleRetry}></Button>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: primaryBackgroundTokens["background-primary"],
        height: "100%",
        gap: 54,
    },

    textContainer: {
        gap: 18,
        width: 400
    },

    header: {
        ...fonts.h1
    },
    text: {
        ...fonts.paragraph,
    },

    //right
    rightContainer: {
        alignItems: "center",
        padding: 24,
        gap: 24,
        borderWidth: 2,
        borderColor: primaryColorTokens["color-tertiary-lowest"],
        borderStyle: "dashed",
        borderRadius: 4,
    },

    errorText: {
        ...fonts.h1,
        color: primaryColorTokens["color-danger-high"]
    },

    triesContainer: {
        gap: 3,
        alignItems: "center"
    },

    triesText: {
        ...fonts.paragraph,
        color: primaryColorTokens["color-tertiary-lower"],
        borderColor: primaryColorTokens["color-tertiary-lower"],
        borderWidth: 1,
        width: 46,
        height: 46,
        borderRadius: 200,
        alignContent: "center",
        textAlign: "center"
    },

    triesNumberContainer: {
        flexDirection: "row",
        gap: 16,
        padding: 10,
        borderRadius: 200,
        backgroundColor: primaryBackgroundTokens["background-secondary"]
    }
})

export default EndingPage;