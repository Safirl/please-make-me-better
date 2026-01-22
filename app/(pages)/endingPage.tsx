import { useProgressStorage } from "@/assets/scripts/storage/useGameProgressStorage"
import fonts from "@/assets/styles/fonts"
import { primaryBackgroundTokens } from "@/assets/tokens/primary/backgrounds.tokens"
import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens"
import Button from "@/ui/Button"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { texts } from "@/assets/data/endingTexts"
import { useEmotionStorage, useMemoryStorage, usePersonalityStorage } from "@/assets/scripts/storage/useParametersStorage"
import TextAnimatedLine from "@/ui/animations/animatedTexts/AnimatedText";
import { useParametersDisplayStateStorage } from "@/assets/scripts/storage/useParametersProgressStorage"

const EndingPage = () => {
    const choices = useProgressStorage((state) => state.choices)
    const setStep = useProgressStorage((state) => state.setStep)
    const [chosenPath, setChosenPath] = useState({ choice: 0, length: -1 })
    const resetEmotions = useEmotionStorage((state) => state.resetEmotions)
    const resetPersonality = usePersonalityStorage((state) => state.resetPersonality)
    const resetMemories = useMemoryStorage((state) => state.resetMemories)
    const resetParametersProgress = useParametersDisplayStateStorage((state) => state.resetParametersProgress)
    const setChoices = useProgressStorage((state) => state.setChoices)

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
        resetExperience()
        setStep("configurator");
    }

    const resetExperience = () => {
        //reset parameters progress storage and choices in gameStorage
        resetEmotions()
        resetMemories()
        resetPersonality()
        resetParametersProgress()
        setChoices([]);
    }

    return (
        <View style={styles.container}>
            <View>
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
            </View>
            <View style={styles.rightContainer}>
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
            </View>
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
        borderRadius: 4
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