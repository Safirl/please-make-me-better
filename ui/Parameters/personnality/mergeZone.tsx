import fonts from "@/assets/styles/fonts";
import { usePersonnalityStorage } from "@/storage/store";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const DIMENSIONS = Dimensions.get("window")

const MergeZone = () => {
    const currentTraitPosition = usePersonnalityStorage((state) => state.currentTraitPosition)
    const composedTraits = usePersonnalityStorage((state) => state.composedTraits)

    const isCurrentTraitInMergeZone = (): boolean => {
        if (composedTraits[1] !== null || composedTraits[1] !== null)
            return true;
        const dx = currentTraitPosition.x - DIMENSIONS.width/2
        const dy = currentTraitPosition.y - DIMENSIONS.height/2
        const distance = Math.sqrt(dx*dx + dy*dy)
        return distance < 75
    }

    const mergeContainerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isCurrentTraitInMergeZone() ? 1 : 0, {}, () => {
        }),
    }));

    const addContainerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isCurrentTraitInMergeZone() ? 0 : 1, {}, () => {
        }),
    }));

    return (
        <View style={[styles.container]}>
        {
            <Animated.View style={[styles.subContainer, addContainerAnimatedStyle]}>
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
            </Animated.View>
        }
        {
            <Animated.View style={[styles.subContainer, styles.containerMerge, mergeContainerAnimatedStyle]}>
                <View style={styles.placeHolder}></View>
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
                <View style={styles.placeHolder}></View>
            </Animated.View>
        }
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(5, 5, 7, 0.19)",
    },
    
    subContainer: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    },

    containerMerge: {
        opacity: 0,
        flexDirection: "row"
    },

    text: {
        textAlign: "center",
        ...fonts.paragraph,
        fontSize: 9,
        maxWidth: "80%"
    },

    placeHolder: {
        borderColor: primaryColorTokens["color-tertiary-lower"],
        borderWidth: 1,
        borderRadius: 200,
        width: 44,
        height: 44,
    }
})

export default MergeZone;