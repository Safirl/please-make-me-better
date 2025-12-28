import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { useGestureDrag } from "@/ui/hooks/baseGestureHandler";
import SvgComponent, { iconType, SvgComponentProps } from "@/ui/svg";
import { useEffect } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet } from "react-native"
import { Gesture, GestureDetector, GestureType } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

interface traitButtonProps {
    iconName: iconType,
    x: number,
    y: number
}

const TraitButton = (props: traitButtonProps) => {
    const top = useSharedValue(props.y)
    const left = useSharedValue(props.x)

    const { panGesture, animatedStyle, onLayoutHandler } = useGestureDrag({
        initialX: props.x,
        initialY: props.y,
        resetOnDragFinzalize: true,
    });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.button, animatedStyle]} onLayout={onLayoutHandler}>
                <SvgComponent name={props.iconName}></SvgComponent>
            </Animated.View>
        </GestureDetector>
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