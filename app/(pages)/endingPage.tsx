import { useProgressStorage } from "@/assets/scripts/storage/useGameProgressStorage"
import fonts from "@/assets/styles/fonts"
import { primaryBackgroundTokens } from "@/assets/tokens/primary/backgrounds.tokens"
import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens"
import Button from "@/ui/Button"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import {texts} from "@/assets/data/endingTexts"

const EndingPage = () => {
    const choices = useProgressStorage((state) => state.choices)
    const [chosenPath, setChosenPath] = useState({choice: -1, length: -1})

    useEffect(() => {
        const paths = [
            {choice: 0, length: choices.filter((choice) => choice === 0).length},
            {choice: 0, length: choices.filter((choice) => choice === 1).length},
            {choice: 2, length: choices.filter((choice) => choice === 2).length}
        ]

        paths.forEach(path => {
            if (path.length > chosenPath.length) {
                setChosenPath(path)
            }
        });
        console.log(chosenPath)
    }, [choices])

    return (
    <View style={styles.container}>
        <View>
            {/* SVG */}
            <View style= {styles.textContainer}>
                <Text style={styles.header}>Compte rendu</Text>
                <Text style={styles.text}>{texts[chosenPath.choice]}</Text>
                <Text style={[styles.text, {color: primaryColorTokens["color-danger-high"]}]}>L’état général du client n’est pas compatible avec sa demande. Le dossier ne peut être considéré comme clos.</Text>
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
                <Text style={{...fonts.paragraph, color: primaryColorTokens["color-tertiary-lower"]}}>Tentatives restantes</Text>
            </View>
            <Button label="Rééssayer" type="primary" overridePadding={60}></Button>
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

    triesText:{
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