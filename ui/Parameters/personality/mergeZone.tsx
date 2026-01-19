import fonts from "@/assets/styles/fonts";
import { usePersonalityStorage } from "@/assets/scripts/storage/store";
import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions, LayoutChangeEvent } from "react-native";
import Animated, { runOnJS, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { scheduleOnRN } from "react-native-worklets";

const DIMENSIONS = Dimensions.get("window")

const MergeZone = () => {
    const leftPlaceHolderRef = useRef<View>(null)
    const rightPlaceHolderRef = useRef<View>(null)

    const currentTraitPosition = usePersonalityStorage((state) => state.currentTraitPosition)
    const composedTraits = usePersonalityStorage((state) => state.selectedTraits)
    const setPlaceHolderPos = usePersonalityStorage((state) => state.setPlaceHolderPos)
    const containerCenterX = usePersonalityStorage((state) => state.containerCenterX)
    const containerCenterY = usePersonalityStorage((state) => state.containerCenterY)
    const placeHoldersPos = usePersonalityStorage((state) => state.placeHoldersPos)

    const [width0, setWidth0] = useState(0)
    const [height0, setHeight0] = useState(0)
    const [width1, setWidth1] = useState(0)
    const [height1, setHeight1] = useState(0)

    const isCurrentTraitInMergeZone = (): boolean => {
        if (composedTraits['0'] !== null || composedTraits['0'] !== null)
            return true;
        const dx = currentTraitPosition.x - containerCenterX
        const dy = currentTraitPosition.y - containerCenterY
        const distance = Math.sqrt(dx*dx + dy*dy)
        return distance < 75
    }

    const mergeContainerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isCurrentTraitInMergeZone() ? 1 : 0),
    }));

    const addContainerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isCurrentTraitInMergeZone() ? 0 : 1),
    }));

    const onLeftLayoutHandler = (e: LayoutChangeEvent) => {
        leftPlaceHolderRef.current?.measure((x,y,width,height) => {
            setWidth0(width)
            setHeight0(height)
        })
    }

    const onRightLayoutHandler = (e: LayoutChangeEvent) => {
        rightPlaceHolderRef.current?.measure((x,y,width,height) => {
            setWidth1(width)
            setHeight1(height)
        })
    }

    const getPlaceHolderPosition = (index: number, width: number, height: number): {x: number, y: number} => {
        const first = index
        const x = first ? containerCenterX + 15.5 + width/2 : containerCenterX - 15.5 - width/2
        const y =  containerCenterY

        return {x,y}
    }

    useEffect(() => {
        const pos0 = getPlaceHolderPosition(0, width0, height0)
        const pos1 = getPlaceHolderPosition(1, width1, height1)
        setPlaceHolderPos(0, pos0.x, pos0.y)
        setPlaceHolderPos(1, pos1.x, pos1.y)
    }, [containerCenterX, containerCenterY, width0, width1])

    return (
        <View style={[styles.container]}>
        {
            <Animated.View style={[styles.subContainer, addContainerAnimatedStyle]} onLayout={onLeftLayoutHandler}>
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
            <Animated.View style={[styles.subContainer, styles.containerMerge, mergeContainerAnimatedStyle]} onLayout={onRightLayoutHandler}>
                <View ref={leftPlaceHolderRef}  style={styles.placeHolder}></View>
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
                <View ref={rightPlaceHolderRef} style={styles.placeHolder}></View>
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