import { Trait } from "@/data/characters";
import { usePersonnalityStorage } from "@/storage/store";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import MergeZone from "@/ui/Parameters/personnality/mergeZone";
import TraitButton from "@/ui/Parameters/personnality/traitButton";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const CIRCLE_RADIUS = 154;
const TOTAL_ANGLE = (Math.PI * 3)/2
const DIMENSIONS = Dimensions.get("window")


const personnalityParameters = () => {
    const traits = usePersonnalityStorage((state) => state.traits)
    const createTrait = usePersonnalityStorage((state) => state.createTrait)
    
    const getPosForTrait = (trait: Trait): {x: number, y: number} => {
        const alphaSpacing = TOTAL_ANGLE / (traits.length - 1)
        let ox = DIMENSIONS.width/2
        let oy = DIMENSIONS.height/2
        const currentAngle = alphaSpacing * (trait.id + 1) + Math.PI/1.7;
        ox += CIRCLE_RADIUS * Math.cos(currentAngle)
        oy += CIRCLE_RADIUS * Math.sin(currentAngle)

        return {x: ox, y: oy}
    }

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
        {
            traits.map((trait) => (
                <TraitButton key={trait.id} id={trait.id} iconName={trait.icon} x={getPosForTrait(trait).x} y={getPosForTrait(trait).y} mergeZoneRadius={75}/>
            ))
        }
        <MergeZone/>
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