import { usePersonalityStorage } from "@/assets/scripts/storage/useParametersStorage";
import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens";
import { useGestureDrag } from "@/assets/scripts/hooks/baseGestureHandler";
import SvgComponent, { iconType } from "@/ui/svg";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native"
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { SharedValue, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const DIMENSIONS = Dimensions.get("screen")
const MERGE_RADIUS = 43

interface traitButtonProps {
    id: number,
    iconName: iconType,
    label: string,
    mergeZoneRadius: number,
    alphaSpacing: number,
    circleRadius: number,
    scale: number,
    emptyButton: boolean,
    rotation: SharedValue<number>
}

const TraitButton = (props: traitButtonProps) => {
    const {emptyButton} = props
    const setCurrentTraitPosition = usePersonalityStorage((state) => state.setCurrentTraitPosition)
    const addComposedTrait = usePersonalityStorage((state) => state.addSelectedTrait)
    const selectedTraits = usePersonalityStorage((state) => state.selectedTraits)
    const containerCenterX = usePersonalityStorage((state) => state.containerCenterX)
    const containerCenterY = usePersonalityStorage((state) => state.containerCenterY)
    const setClosestTraitId = usePersonalityStorage((state) => state.setClosestTraitId)
    const opacity = useSharedValue(1)
    const enabled = useSharedValue(false)
    // const rotation = usePersonalityStorage((state) => state.rotation)
    const rotation = props.rotation
    let savedRotation = 0

    const closestMultiple = (n: number, x: number) => {
        n = n + x / 2;
        n = n - (n % x);
        return n;
    }

    const getPos = (): {x: number, y: number} => {
        let ox = containerCenterX /* + DIMENSIONS.width/2*/
        let oy = containerCenterY /*+ DIMENSIONS.height/2*/
        const currentAngle = props.alphaSpacing * (props.id + 1) + closestMultiple(rotation.value, props.alphaSpacing) + Math.PI/2;
        savedRotation = rotation.value;
        ox += props.circleRadius * Math.cos(currentAngle)
        oy += props.circleRadius * Math.sin(currentAngle)
        return {x: ox, y: oy}
    }

    const { panGesture, animatedStyle, onLayoutHandler, position } = useGestureDrag({
        initialX: 0,
        initialY: 0,
        resetOnDragFinalize: false,
        onDragEnded(x, y) {
            if (!isTraitInMergeZoneRadius(x,y) || selectedTraits['1']?.id !== undefined) {
                if (emptyButton) return;
                position.left.value = withSpring(getPos().x)
                position.top.value = withSpring(getPos().y)
            }
            else {
                if (emptyButton) return;
                enabled.value = false
                addComposedTrait({id: props.id, icon: props.iconName, label: props.label})
                setClosestTraitId(-1)
            }
        },
        onPositionChanged(x, y) {
            if (emptyButton) return;
            setCurrentTraitPosition(x,y)
        },
        enable: enabled
    });
    
    const isTraitClose = (): boolean => {
        return Math.abs(position.top.value - DIMENSIONS.height/2) < MERGE_RADIUS
    }

    //rotate
    useAnimatedReaction(
        () => rotation.value,
        (currentRotation, previousRotation) => {
            const newPos = getPos();
            position.left.value = withSpring(newPos.x, {duration: 500}, () => {
                    if (isTraitClose()) {
                        setClosestTraitId(props.id)
                        if (!emptyButton)
                            enabled.value = true
                    }
                    else {
                        enabled.value = false
                    }
                });
            if (selectedTraits['0']?.id === props.id || selectedTraits['1']?.id === props.id && !emptyButton) {
                position.left.value = withSpring(DIMENSIONS.width/2)
                position.top.value = withSpring(DIMENSIONS.height/2 + DIMENSIONS.height)
            }
            else {
                position.top.value = withSpring(newPos.y);
            }
        }
    );

    const isTraitInMergeZoneRadius = (x: number, y: number): boolean => {
        const dx = x - DIMENSIONS.width/2
        const dy = y - DIMENSIONS.height
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < props.mergeZoneRadius;
    }

    const opacityAnimatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    const dynamicStyle = StyleSheet.create({
        style: {
            transform: [{scale: props.scale}],
        },
        empty: {
            backgroundColor: "none",
            borderWidth: 1,
            borderColor: primaryColorTokens["color-tertiary-lower"],
            boxShadow: "none",
            opacity: .5
        }
    })

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.button, animatedStyle, opacityAnimatedStyle, dynamicStyle.style, emptyButton && dynamicStyle.empty]} onLayout={onLayoutHandler}>
                {emptyButton ? <View style={{width: 24, height: 24}}/> : <SvgComponent name={props.iconName}></SvgComponent>}
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