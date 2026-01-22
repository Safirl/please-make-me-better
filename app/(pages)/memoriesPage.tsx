import fonts from "@/assets/styles/fonts";
import GunCursor from "@/ui/Parameters/memories/gunCursor";
import Target from "@/ui/Parameters/memories/target";
import { primaryBackgroundTokens } from "@/assets/tokens/primary/backgrounds.tokens";
import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens";
import { fontTokens } from "@/assets/tokens/primary/font.tokens";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useMemoryStorage } from "@/assets/scripts/storage/useParametersStorage";
import Button from "@/ui/Button";
import SvgComponent from "@/ui/svg";
import { router } from "expo-router";
import { useEffect } from "react";
import { useParametersDisplayStateStorage } from "@/assets/scripts/storage/useParametersProgressStorage";
import Animated, { withSequence, useAnimatedStyle, useSharedValue, withTiming, withDelay } from "react-native-reanimated";
import { Easing } from "react-native"

const DIMENSIONS = Dimensions.get("screen")

const MemoriesParameters = () => {
    const setCurrentParameter = useParametersDisplayStateStorage((state) => state.setCurrentParameter)
    const setHasParameterBeenModified = useParametersDisplayStateStorage((state) => state.setHasParameterBeenModified)

    const memories = useMemoryStorage((state) => state.memories)
    const shootMemory = useMemoryStorage((state) => state.removeMemory)

    const shoot = (posX: number, posY: number) => {
        memories.forEach((memory) => {
            const distance = Math.sqrt(Math.pow((posX - memory.posX * DIMENSIONS.width), 2) + Math.pow((posY - memory.posY * DIMENSIONS.height), 2))
            if (distance < 75) {
                shootMemory(memory)
            }
        })
    }

    const easeOut = Easing.in(Easing.exp)

    const back = () => {
        const d = 500
        globalOpacity.value = withTiming(0, { duration: d, easing: easeOut })

        setTimeout(() => {
            router.navigate("/configuratorPage")
        }, d)
    }


    const globalOpacity = useSharedValue(0)

    useEffect(() => {
        setCurrentParameter("memories")
        setHasParameterBeenModified(true)


        globalOpacity.value = withSequence(
            withTiming(0, { duration: 1, easing: easeOut }),
            withDelay(
                100,
                withTiming(0, { duration: 1, easing: easeOut })
            ),
            withDelay(
                500,
                withTiming(1, { duration: 1, easing: easeOut }),
            ),
            withDelay(
                10,
                withTiming(0, { duration: 1, easing: easeOut })
            ),
            withDelay(
                100,
                withTiming(1, { duration: 1, easing: easeOut })
            ),
            withDelay(
                10,
                withTiming(0, { duration: 1, easing: easeOut })
            ),
            withDelay(
                100,
                withTiming(1, { duration: 1, easing: easeOut })
            )
        )

    }, [])




    const globalOpacityStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: globalOpacity.value
        }
    })

    return (
        <Animated.View style={[styles.container, globalOpacityStyleAnimation]}>

            <View
                style={{
                    position: "absolute",
                    top: 24,
                    left: 16,
                    zIndex: 100
                }}
            >
                <Button onPress={back} type="icon">
                    <SvgComponent name="back-chevron" />
                </Button>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>Souvenirs</Text>
                <Text style={[styles.text, styles.instructionText]}>Trier sa mémoire</Text>
            </View>
            <GunCursor onDragEnded={shoot} />
            {memories.map((memory) => (
                <Target key={memory.id} x={memory.posX * DIMENSIONS.width} y={memory.posY * DIMENSIONS.height} type={memory.type} label={memory.label} />
            ))}

        </Animated.View>
    )
}

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
        height: "100%",
        overflow: "hidden"
    }
})