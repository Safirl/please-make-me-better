import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { primaryFontTokens } from "@/tokens/primary/font.tokens";
import { primaryTextTokens } from "@/tokens/primary/text.tokens";
import { View, Text, Pressable, StyleSheet } from "react-native";
import fonts from "@/assets/styles/fonts";
import { useSharedValue } from "react-native-reanimated";

interface targetProps {
    x: number,
    y: number
    label: string
    type: 'dashed' | 'filled'
}

const Target = (props: targetProps) => {
    const positionX = useSharedValue(props.x)
    const positionY = useSharedValue(props.y)

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.label}</Text>
            <Pressable style={[styles.buttonBase, props.type === "filled" && styles.buttonFilled, props.type === "dashed" && styles.buttonDashed]}>
                <Text style={styles.text}>X</Text>
            </Pressable>
        </View>
    )
}

export default Target;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 200,
        left: 200,
    },

    buttonBase: {
        marginTop: 8,
        padding: 32,
        borderColor: primaryColorTokens["color-white"],
        width: "auto"
    },
    
    buttonFilled: {
        borderWidth: 1,
    },

    buttonDashed: {
        borderWidth: 1,
        borderStyle: "dashed",
    },
    
    text: {  
        ...fonts.paragraph
    }
})