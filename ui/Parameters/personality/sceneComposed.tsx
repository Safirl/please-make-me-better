import { usePersonalityStorage } from "@/storage/store"
import Animated, { useDerivedValue, useSharedValue } from "react-native-reanimated"
import { View, Text } from "react-native"
import TraitButton from "./traitButton"
import { useEffect } from "react"
import { Dimensions, StyleSheet } from "react-native"
import fonts from "@/assets/styles/fonts"
import { primaryColorTokens } from "@/tokens/primary/colors.tokens"
import SvgComponent from "@/ui/svg"
import Svg, { Path } from "react-native-svg"
import Button from "@/ui/Button"

const DIMENSIONS = Dimensions.get("screen")

const SceneComposed = () => {
    const composedTraits = usePersonalityStorage((state) => state.composedTraits)
    const setPlaceHolderPos = usePersonalityStorage((state) => state.setPlaceHolderPos)
    const posX = useSharedValue(0)
    const posY = useSharedValue(0)


    // const getPlaceHolderPosition = (index: number, width: number, height: number): {x: number, y: number} => {
    //     const first = index
    //     const x = first ? 15.5 + width/2 : 15.5 - width/2
    //     const y =  0

    //     return {x,y}
    // }

    useEffect(() => {
        console.log
        setPlaceHolderPos(0, DIMENSIONS.width/2, DIMENSIONS.height/2)
        setPlaceHolderPos(1, DIMENSIONS.width/2, DIMENSIONS.height/2)
    }, [])

    // useDerivedValue(() => {
    //     setPlaceHolderPos(0, DIMENSIONS.width/2, DIMENSIONS.height/2)
    //     setPlaceHolderPos(1, DIMENSIONS.width/2, DIMENSIONS.height/2)
    // })

    // if (!composedTraits[0] || composedTraits[1]) {
    //     return (
    //         <></>
    //     )
    // }

    return (
        <Animated.View style={styles.container}>
            {/* <View> */}
                <View style={styles.textContainer}>
                    <View style={styles.dot}/>
                    <Text style={styles.text}>Nom du nouveau trait : XXX</Text>
                </View>
                <View style={styles.separator}/>
            {/* </View> */}
            <Svg
                style={styles.svg}
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
            <View style={styles.buttonContainer}>
                <Button type="tertiary" label="Reject" icon={{name: "cross"}}/>
                <Button type="primary" label="Add" icon={{name: "lightning-bolt"}}/>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        // top: DIMENSIONS.height/2,
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

    svg: {
        marginVertical: 64
    },

    buttonContainer: {
        flexDirection: "row",
        gap: 8
    }
})

export default SceneComposed