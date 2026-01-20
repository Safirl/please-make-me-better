import { usePersonalityStorage } from "@/storage/store";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { useGestureDrag } from "@/assets/scripts/hooks/baseGestureHandler";
import SvgComponent, { iconType } from "@/ui/svg";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native"
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { SharedValue, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

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
    closestTraitId: SharedValue<number>
}

const TraitButton = (props: traitButtonProps) => {
    const {emptyButton, closestTraitId} = props
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

    const baseAngle = useDerivedValue(() =>
        props.alphaSpacing * (props.id + 1) + Math.PI / 2
    )

    const rotatedX = useDerivedValue(() =>
        containerCenterX + props.circleRadius * Math.cos(baseAngle.value + rotation.value)
    )

    const rotatedY = useDerivedValue(() =>
        containerCenterY + props.circleRadius * Math.sin(baseAngle.value + rotation.value)
    )



    const { panGesture, animatedStyle, onLayoutHandler, position } = useGestureDrag({
        initialX: 0,
        initialY: 0,
        resetOnDragFinalize: false,
        onDragEnded(x, y) {
            if (!isTraitInMergeZoneRadius(x,y) || selectedTraits['1']?.id !== undefined) {
                if (emptyButton) return;
                position.left.value = withSpring(rotatedX.value)
                position.top.value = withSpring(rotatedY.value)
            }
            else {
                if (emptyButton) return;
                enabled.value = false
                addComposedTrait({id: props.id, icon: props.iconName, label: props.label})
                // setClosestTraitId(-1)
            }
        },
        // onPositionChanged(x, y) {
        //     if (emptyButton) return;
        //     // setCurrentTraitPosition(x,y)
        // },
        enable: enabled
    });

    //rotate
    // useAnimatedReaction(
    //     () => rotation.value,
    //     (currentRotation, previousRotation) => {
    //         const newPos = getPos();
    //         position.left.value = withSpring(newPos.x, {duration: 500}, () => {
    //                 if (isTraitClose()) {
    //                     setClosestTraitId(props.id)
    //                     if (!emptyButton)
    //                         enabled.value = true
    //                 }
    //                 else {
    //                     enabled.value = false
    //                 }
    //             });
    //         if (selectedTraits['0']?.id === props.id || selectedTraits['1']?.id === props.id && !emptyButton) {
    //             position.left.value = withSpring(DIMENSIONS.width/2)
    //             position.top.value = withSpring(DIMENSIONS.height/2 + DIMENSIONS.height)
    //         }
    //         else {
    //             position.top.value = withSpring(newPos.y);
    //         }
    //     }
    // );

    const derivedPosition = useDerivedValue(() => {
        const angle =
            props.alphaSpacing * (props.id + 1) +
            rotation.value +
            Math.PI / 2

        const x = containerCenterX + props.circleRadius * Math.cos(angle)
        const y = containerCenterY + props.circleRadius * Math.sin(angle)

        return { x, y }
    })
    
    useAnimatedReaction(
        () => derivedPosition.value,
        (pos) => {
            position.left.value = withSpring(pos.x)
            position.top.value = withSpring(pos.y)
        }
    )

    const isClose = useDerivedValue(() => {
        const dx = derivedPosition.value.x - DIMENSIONS.width / 2
        const dy = derivedPosition.value.y - DIMENSIONS.height / 2
        // if (props.id === 0)
            // console.log(Math.sqrt(dx * dx + dy * dy))
        // console.log("isClose: ", Math.sqrt(dx * dx + dy * dy) < MERGE_RADIUS)
        return Math.sqrt(dx * dx + dy * dy) < MERGE_RADIUS
    })

    useAnimatedReaction(
        () => isClose.value,
        (close, prev) => {
            if (close && !prev) {
                closestTraitId.value = props.id
                enabled.value = !emptyButton
            }
            if (!close && prev) {
                enabled.value = false
            }
        }
    )

    useAnimatedReaction(
        () => closestTraitId.value,
        (value, prev) => {
            if (value !== prev) {
                console.log("isClose: ", value, " prev: ", prev, " for: ", props.label)
                scheduleOnRN(setClosestTraitId, value)
            }
        }
    )

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