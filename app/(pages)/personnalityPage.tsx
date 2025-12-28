import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import TraitButton from "@/ui/Parameters/personnality/traitButton";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const personnalityParameters = () => {
    return (
    <View style={styles.container}>
        <Svg
            width={308}
            height={308}
            viewBox="0 0 308 308"
            fill="none"
            style={styles.circle}
        >
            <Circle cx={154} cy={154} r={153.5} stroke="url(#a)"/>
            <Defs>
            <LinearGradient
                id="a"
                x1={154}
                x2={154}
                y1={0}
                y2={308}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#BFBFBF" />
                <Stop offset={1} stopColor="#999" stopOpacity={0} />
            </LinearGradient>
            </Defs>
        </Svg>
        <TraitButton iconName="comet" x={180} y={200}/>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    circle: {
        position: "absolute",
        zIndex: 1,
        // top: 0,
        // left: 0,
    }
})

export default personnalityParameters;