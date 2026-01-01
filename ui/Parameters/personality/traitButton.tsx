import { Trait } from "@/data/characters";
import { usePersonalityStorage } from "@/storage/store";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { useGestureDrag } from "@/ui/hooks/baseGestureHandler";
import SvgComponent, { iconType, SvgComponentProps } from "@/ui/svg";
import { useEffect } from "react";
import { Dimensions, LayoutChangeEvent, Pressable, StyleSheet } from "react-native"
import { Gesture, GestureDetector, GestureType } from "react-native-gesture-handler";
import Animated, { SharedValue, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const DIMENSIONS = Dimensions.get("window")

interface traitButtonProps {
    id: number,
    iconName: iconType,
    label: string,
    mergeZoneRadius: number,
    alphaSpacing: number,
    circleRadius: number,
    totalAngle: number
}

const TraitButton = (props: traitButtonProps) => {
    const setCurrentTraitPosition = usePersonalityStorage((state) => state.setCurrentTraitPosition)
    const addComposedTrait = usePersonalityStorage((state) => state.addComposedTrait)
    const composedTraits = usePersonalityStorage((state) => state.composedTraits)
    const placeHoldersPos = usePersonalityStorage((state) => state.placeHoldersPos)
    const containerCenterX = usePersonalityStorage((state) => state.containerCenterX)
    const containerCenterY = usePersonalityStorage((state) => state.containerCenterY)

    const getPos = (): {x: number, y: number} => {
        let ox = containerCenterX /* + DIMENSIONS.width/2*/
        let oy = containerCenterY /*+ DIMENSIONS.height/2*/
        const currentAngle = props.alphaSpacing * (props.id + 1) + Math.PI/1.7;
        ox += props.circleRadius * Math.cos(currentAngle)
        oy += props.circleRadius * Math.sin(currentAngle)
        return {x: ox, y: oy}
    }

    const { panGesture, animatedStyle, onLayoutHandler, position } = useGestureDrag({
        initialX: getPos().x,
        initialY: getPos().y,
        resetOnDragFinalize: false,
        onDragEnded(x, y) {
            if (!isTraitInMergeZoneRadius(x,y) || composedTraits['1']?.id !== undefined) {
                position.left.value = withSpring(getPos().x)
                position.top.value = withSpring(getPos().y)
            }
            else {
                addComposedTrait({id: props.id, icon: props.iconName, label: props.label})
            }
        },
        onPositionChanged(x, y) {
            setCurrentTraitPosition(x,y)
        },
    });
    
    useEffect(() => {
        if (composedTraits['0']?.id === props.id) {
            position.left.value = withSpring(placeHoldersPos[0].x)
            position.top.value = withSpring(placeHoldersPos[0].y)
        }
        else if (composedTraits['1']?.id === props.id) {
            position.left.value = withSpring(placeHoldersPos[1].x)
            position.top.value = withSpring(placeHoldersPos[1].y)
        }
        else {
            position.left.value = withSpring(getPos().x)
            position.top.value = withSpring(getPos().y)
        }
    }, [[composedTraits], placeHoldersPos])

    const isTraitInMergeZoneRadius = (x: number, y: number): boolean => {
        const dx = x - containerCenterX
        const dy = y - containerCenterY
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