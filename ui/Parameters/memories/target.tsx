import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens";
import { primaryFontTokens } from "@/assets/tokens/primary/font.tokens";
import { primaryTextTokens } from "@/assets/tokens/primary/text.tokens";
import { View, Text, Pressable, StyleSheet, LayoutChangeEvent, Dimensions } from "react-native";
import fonts from "@/assets/styles/fonts";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";
import { useMemoryStorage } from "@/assets/scripts/storage/useParametersStorage";

const dimensions = Dimensions.get("screen");

interface targetProps {
    x: number,
    y: number
    label: string
    type: 'dashed' | 'filled' | 'dashedNoCursor'
}

const Target = (props: targetProps) => {
    const gunPosition = useMemoryStorage((state) => state.gunPosition)
    const positionX = useSharedValue(props.x)
    const positionY = useSharedValue(props.y)
    const width = useSharedValue(0)
    const height = useSharedValue(0)

    const onLayoutHandler = (e: LayoutChangeEvent) => {
        width.value = e.nativeEvent.layout.width;
        height.value = e.nativeEvent.layout.height;
    }

    const getParallaxDisplacement = (): {x: number, y: number} => {        
        const xDiff = gunPosition.x/dimensions.width - .5
        const yDiff = gunPosition.y/dimensions.height - .5

        const distance = Math.sqrt(Math.pow((positionX.value - gunPosition.x), 2) + Math.pow((positionY.value - gunPosition.y), 2))
        return {x:-xDiff* distance * .1,y:-yDiff* distance  * .1}
        // return {x:-xDiff* 30,y:-yDiff* 30}
    } 

    const positionStyle = useAnimatedStyle(() => ({
        top: positionY.value,
        left: positionX.value,
        transform: [
            { translateX: (-width.value / 2) + getParallaxDisplacement().x },
            { translateY: (-height.value / 2) + getParallaxDisplacement().y },
    ],
    }))


    return(
        <Animated.View style={[styles.container, positionStyle]} onLayout={onLayoutHandler}>
            <Text style={styles.text}>{props.label || "lorem ipsum"}</Text>
            <Pressable style={[styles.buttonBase, props.type === "filled" && styles.buttonFilled]}>
                {
                    (props.type === "dashed" || props.type === "dashedNoCursor")
                    &&
                    <>
                        <Svg width={props.type === "dashed" ? "82" : "62"} height={props.type === "dashed" ? "82" : "62"}>
                            <Rect
                            x="1"
                            y="1"
                            width={props.type === "dashed" ? "80" : "60"}
                            height={props.type === "dashed" ? "80" : "60"}
                            fill="none"
                            stroke={primaryColorTokens["color-white"]}
                            strokeWidth="2"
                            strokeDasharray="12 8" // taille du dash / espace
                            rx="8"
                            />
                        </Svg>
                        {props.type === "dashed" &&
                        <Text style={[styles.text, styles.cursor]}>X</Text>
                        }
                    </>
                }
            </Pressable>
        </Animated.View>
    )
}

export default Target;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        textAlign: "center"
    },

    buttonBase: {
        marginTop: 8,
        borderColor: primaryColorTokens["color-white"],
    },
    
    buttonFilled: {
        padding: 8,
        borderWidth: 16,
        borderRadius: 4,
    },
    
    text: {  
        ...fonts.paragraph,
    },
    
    cursor: {
        position: "absolute",
        left: "43%",
        top: "44%",
        fontSize: 20,
    }
})