import GunCursor from "@/components/Parameters/gunCursor";
import Target from "@/components/Parameters/target";
import { primaryBackgroundTokens } from "@/tokens/primary/backgrounds.tokens";
import { StyleSheet, View } from "react-native";

const MemoriesParameters = () => (
    <View style={styles.container}>
        <GunCursor />
        <Target x={100} y={200} label="lorem ipsum"/>
    </View>
)

export default MemoriesParameters;

const styles = StyleSheet.create({
    container: {
        backgroundColor: primaryBackgroundTokens["background-secondary"],
        height: "100%",
        overflow: "hidden"
    }
})