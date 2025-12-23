import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { primaryFontTokens } from "@/tokens/primary/font.tokens";
import { primaryTextTokens } from "@/tokens/primary/text.tokens";
import { View, Text, Pressable, StyleSheet } from "react-native";
import fonts from "@/assets/styles/fonts";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";

interface targetProps {
    x: number,
    y: number
    label: string
    type: 'dashed' | 'filled' | 'dashedNoCursor'
}

const Target = (props: targetProps) => {
    const positionX = useSharedValue(props.x)
    const positionY = useSharedValue(props.y)

    const positionStyle = useAnimatedStyle(() => ({
        top: positionY.value,
        left: positionX.value,
    }))

    return(
        <Animated.View style={[styles.container, positionStyle]}>
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
        alignItems: "center"
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