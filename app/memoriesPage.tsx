import fonts from "@/assets/styles/fonts";
import GunCursor from "@/ui/Parameters/gunCursor";
import Target from "@/ui/Parameters/target";
import { primaryBackgroundTokens } from "@/tokens/primary/backgrounds.tokens";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { fontTokens } from "@/tokens/primary/font.tokens";
import { StyleSheet, View, Text } from "react-native";

const MemoriesParameters = () => (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.text}>Souvenirs</Text>
            <Text style={[styles.text, styles.instructionText]}>Trier sa mémoire</Text>
        </View>
        <GunCursor />
        <Target x={500} y={200} type="filled" label=""/>
        <Target x={200} y={220} type="dashed" label=""/>
        <Target x={250} y={50} type="dashedNoCursor" label=""/>
    </View>
)

export default MemoriesParameters;

const styles = StyleSheet.create({
    titleContainer: {
        display: "flex",
        alignItems: "center",
        paddingTop: 16,
    },

    text: {
        ...fonts.paragraph
    },

    instructionText: {
        marginTop: 4,
        padding: 4,
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: primaryColorTokens["color-white"],
        color: fontTokens.primary['font-color-tertiary'],
        borderRadius: 3,
    },

    container: {
        backgroundColor: primaryBackgroundTokens["background-secondary"],
        height: "100%",
        overflow: "hidden"
    }
})