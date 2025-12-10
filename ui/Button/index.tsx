import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Pressable,
    PressableProps, StyleSheet,
    Text,
    View
} from "react-native";
import SvgComponent, { SvgComponentProps } from "../svg";

interface CustomButtonProps extends PressableProps {
    type: 'primary' | 'secondary' | 'tertiary' | 'back';
    state?: 'none' | 'disabled' | 'active'
    label?: string;
    children?: React.ReactNode;
    icon?: SvgComponentProps,
}

const styles = StyleSheet.create({
    layout: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        gap: 8,
        flexDirection: "row",
        borderRadius: 4,
    },

    border: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 5,
    },
    
    content: {
        color: primaryColorTokens['color-white'],
        userSelect: "none",
    },

    contentSecondary: {
        color: primaryColorTokens['color-secondary-medium'],
        userSelect: "none",
    },

    contentDisabled: {
        color: primaryColorTokens['color-tertiary-lower'],
    },

    pressable:{
        position: "relative",
        padding: 1,
        borderRadius: 5,
    },

    //Style modifiers

    primary: {
        backgroundColor: primaryColorTokens["color-primary-medium"],
    },

    primaryPressed: {
        backgroundColor: primaryColorTokens["color-primary-high"],
    },

    primaryDisabled: {
        backgroundColor: primaryColorTokens["color-tertiary-low"],
    },

    secondary: {
        backgroundColor: primaryColorTokens["color-tertiary-low"],
    },

    secondaryPressed: {
        backgroundColor: primaryColorTokens["color-tertiary-medium"],
    },

    secondaryDisabled: {
        backgroundColor: primaryColorTokens["color-tertiary-medium"],
    },

    tertiary: {
        backgroundColor: primaryColorTokens["color-tertiary-medium"],
    },
})

const ButtonPrimary: React.FC<CustomButtonProps> = (props) => {
    const [isPressed, setIsPressed] = useState(false)

    const {
        type,
        state,
        icon: iconName,
        children,
        label,
        ...rest
    } = props

    const iconColor = state === "disabled"
    ? styles.contentDisabled.color : state === "active" ? 
    styles.contentSecondary.color : styles.content.color

    const borderGradient = type === "back"
    ? primaryColorTokens["gradient-border-2"] : type === "tertiary" && state === "active"
    ? primaryColorTokens["gradient-border-3"] : type === "tertiary" ? primaryColorTokens["gradient-border-4"] : primaryColorTokens["gradient-border-1"]

    console.log("border ", borderGradient)
    
    return <Pressable
    onPressIn={() => {setIsPressed(true)}}
    onPressOut={() => {setIsPressed(false)}}
    style={[
        styles.pressable, 
        type === "primary" && 
        [
            styles.primary,
            isPressed && styles.primaryPressed,
            state == "disabled" && styles.primaryDisabled
        ],
        type === "secondary" && [
            styles.secondary,
            isPressed && styles.secondaryPressed,
            state == "disabled" && styles.secondaryDisabled
        ],
        type === "back" && [
            styles.secondary,
            isPressed && styles.secondaryPressed,
            state == "disabled" && styles.secondaryDisabled
        ],
        type === "tertiary" && [
            styles.tertiary,
        ]
    ]}
    {...rest}
    >
            <LinearGradient 
                colors={borderGradient}
                style={styles.border}
            />
            <View
                style={[
                    styles.layout,
                    type === "primary" && [
                        styles.primary,
                        isPressed && styles.primaryPressed,
                        state == "disabled" && styles.primaryDisabled
                    ],
                    type === "secondary" && [
                        styles.secondary,
                        isPressed && styles.secondaryPressed,
                        state == "disabled" && styles.secondaryDisabled
                    ],
                    type === "back" && [
                        styles.secondary,
                        isPressed && styles.secondaryPressed,
                        state == "disabled" && styles.secondaryDisabled
                    ],
                    type === "tertiary" && [
                        styles.tertiary,
                    ],
                ]}
            >
                {
                    iconName && <SvgComponent 
                        color={iconColor}
                        name={iconName.name}/>
                }
                {
                    label
                        ? <Text style={[
                                styles.content,
                                state == "disabled" && styles.contentDisabled,
                                state == "active" && styles.contentSecondary,
                            ]}
                        >{label}</Text>
                        : children
                }
            </View>
    </Pressable>
}

export { ButtonPrimary };

