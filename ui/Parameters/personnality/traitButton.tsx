import { usePersonnalityStorage } from "@/storage/store";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { useGestureDrag } from "@/ui/hooks/baseGestureHandler";
import SvgComponent, { iconType, SvgComponentProps } from "@/ui/svg";
import { useEffect } from "react";
import { Dimensions, LayoutChangeEvent, Pressable, StyleSheet } from "react-native"
import { Gesture, GestureDetector, GestureType } from "react-native-gesture-handler";
import Animated, { useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const DIMENSIONS = Dimensions.get("window")

interface traitButtonProps {
    id: number,
    iconName: iconType,
    x: number,
    y: number
    mergeZoneRadius: number, //We suppose that the center of the merge zone is the center of the screen
}

const TraitButton = (props: traitButtonProps) => {
    const setCurrentTraitPosition = usePersonnalityStorage((state) => state.setCurrentTraitPosition)
    const addComposedTrait = usePersonnalityStorage((state) => state.addComposedTrait)
    const composedTraits = usePersonnalityStorage((state) => state.composedTraits)
    const placeHolders = usePersonnalityStorage((state) => state.placeHolders)

    const { panGesture, animatedStyle, onLayoutHandler, position } = useGestureDrag({
        initialX: props.x,
        initialY: props.y,
        resetOnDragFinalize: false,
        onDragEnded(x, y) {
            console.log(composedTraits['0']?.id)
            if (!isTraitInMergeZoneRadius(x,y) || composedTraits['1']?.id !== undefined) {
                position.left.value = withSpring(props.x)
                position.top.value = withSpring(props.y)
            }
            else {
                addComposedTrait({id: props.id, icon: props.iconName})
            }
        },
        onPositionChanged(x, y) {
            setCurrentTraitPosition(x,y)
        },
    });
    
    useEffect(() => {
        if (composedTraits['0']?.id === props.id) {
            position.left.value = withSpring(placeHolders[0].x)
            position.top.value = withSpring(placeHolders[0].y)
        }
        else if (composedTraits['1']?.id === props.id) {
            position.left.value = withSpring(placeHolders[1].x)
            position.top.value = withSpring(placeHolders[1].y)
        }
    }, [[composedTraits['0']?.id, composedTraits['1']?.id]])

    const isTraitInMergeZoneRadius = (x: number, y: number): boolean => {
        const dx = x - DIMENSIONS.width/2
        const dy = y -DIMENSIONS.height/2
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < props.mergeZoneRadius;
    }

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