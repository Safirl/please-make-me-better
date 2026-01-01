import { Trait } from "@/data/characters"
import { primaryBackgroundTokens } from "@/tokens/primary/backgrounds.tokens"
import { primaryColorTokens } from "@/tokens/primary/colors.tokens"
import { primaryFontTokens } from "@/tokens/primary/font.tokens"
import Button from "@/ui/Button"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { Platform } from "react-native"
import Animated from "react-native-reanimated"
import Svg, { Circle } from "react-native-svg"
import Font from "@/assets/styles/fonts";

interface PersonnalityCardProps {
    trait0: Trait
    trait1: Trait
}

const DIMENSIONS = Dimensions.get("window")

const PersonnalityCard = (props: PersonnalityCardProps) => {
    return (
        <>
            <Animated.View style={styles.container}>
            <View style={styles.subcontainer}>
                <View style={styles.line}>
                    <Text style={styles.content}>
                        Source: 
                    </Text>
                    <Text style={[styles.tag, styles.content]}>
                        {props.trait0.label}
                    </Text>
                    <Text style={styles.content}>
                        +
                    </Text>
                    <Text style={styles.content} style={[styles.tag, styles.content]}>
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
                <Button type="secondary" label="Reject" icon={{name: "cross"}}/>
                <Button type="primary" label="Add" icon={{name: "lightning-bolt"}}/>
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
        display: "flex",
        flexDirection: "column",
        padding: 18,
        gap: 10,

        position: "absolute",
        top: DIMENSIONS.height/2,
        left: 63,
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
        paddingVertical: 8
    },

    line: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    tag:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: primaryColorTokens["color-tertiary-medium"],
        borderRadius: 100,

    }
})

export default PersonnalityCard