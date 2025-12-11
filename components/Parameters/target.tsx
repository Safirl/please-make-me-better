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
}

const Target = (props: targetProps) => {
    const positionX = useSharedValue(props.x)
    const positionY = useSharedValue(props.y)

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.label}</Text>
            <Pressable style={styles.button}>
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

    button: {
        // position: "absolute",
        marginTop: 8,
        padding: 32,
        borderColor: primaryColorTokens["color-white"],
        borderWidth: 1,
        borderStyle: "dashed",
        width: "auto"
    },
    
    text: {  
        ...fonts.paragraph
    }
})