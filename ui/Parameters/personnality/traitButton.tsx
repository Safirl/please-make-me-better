import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import SvgComponent, { iconType, SvgComponentProps } from "@/ui/svg";
import { LayoutChangeEvent, Pressable, StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

interface traitButtonProps {
    iconName: iconType,
    x: number,
    y: number
}

const TraitButton = (props: traitButtonProps) => {
    const top = useSharedValue(props.y)
    const left = useSharedValue(props.x)

    const width = useSharedValue(0)
    const height = useSharedValue(0)

    const onLayoutHandler = (e: LayoutChangeEvent) => {
        width.value = e.nativeEvent.layout.width;
        height.value = e.nativeEvent.layout.height;
    }

    const positionStyle = useAnimatedStyle(() => ({
        top: top.value,
        left: left.value,
        transform: [
            { translateX: -width.value / 2},
            { translateY: -height.value / 2 },
    ],
    }))

    return (
        <Animated.View style={[styles.button, positionStyle]} onLayout={onLayoutHandler}>
            <SvgComponent name={props.iconName}></SvgComponent>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        zIndex: 100,
        padding: 10,
        boxShadow: "0 0 9.7px 0 rgba(231, 229, 254, 0.49)",
        borderRadius: 100,
        backgroundColor: primaryColorTokens["color-tertiary-medium"]
    },
})

export default TraitButton;