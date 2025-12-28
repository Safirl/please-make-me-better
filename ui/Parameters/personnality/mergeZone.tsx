import fonts from "@/assets/styles/fonts";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

const MergeZone = () => {
    
    return (
        <View style={styles.container}>
        <Svg
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
        <Text style={styles.text}>Add two traits to create a new one</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: primaryColorTokens["color-white"],
        borderStyle: "dashed",
        width: 150,
        height: 150,
        borderRadius: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(5, 5, 7, 0.19)",
        gap: 8
    },

    text: {
        textAlign: "center",
        ...fonts.paragraph,
        fontSize: 9,
        maxWidth: "80%"
    }
})

export default MergeZone;