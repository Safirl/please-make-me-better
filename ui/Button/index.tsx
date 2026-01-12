import Font from "@/assets/styles/fonts";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Pressable,
    PressableProps, StyleProp, StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import SvgComponent, { SvgComponentProps } from "../svg";

//ommit styles
interface CustomButtonProps extends PressableProps {
    type: 'primary' | 'secondary' | 'tertiary' | 'back' | 'verticalIcon';
    state?: 'none' | 'disabled' | 'active' | 'accent'
    label?: string;
    children?: React.ReactNode;
    icon?: SvgComponentProps,
    style?: StyleProp<ViewStyle>
    overridePadding?: number,

}

const createStyles = (type: 'primary' | 'secondary' | 'tertiary' | 'back' | 'verticalIcon', state?: 'none' | 'disabled' | 'active' | 'accent') => {
    return StyleSheet.create({
        layout: {
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: type === "back" ? 8 : 12,
            paddingHorizontal: type === "back" ? 16 : 32,
            gap: 8,
            flexDirection: "row",
            borderRadius: 4,
            ...(type === "primary" && {
                minHeight: 46,
            }),
            ...(type === "verticalIcon" && {
                backgroundColor: primaryColorTokens["color-tertiary-medium"],
                flexDirection: "column",
                gap: 12,
                paddingVertical: 16,
                paddingHorizontal: 16,
            })

        },

        border: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 5,
            ...(type === "verticalIcon" && {
                // backgroundColor: primaryColorTokens["color-tertiary-medium"],
                ...(state === "accent" && {
                    backgroundColor: primaryColorTokens["color-primary-medium"]
                })
            })
        },

        content: {
            // color: primaryColorTokens['color-white'],
            userSelect: "none",
            ...Font.paragraph,

            ...(type === "back" && {
                lineHeight: 14
            })
        },
        // content: {
        //     userSelect: "none",
        //     ...Font.paragraph
        // },

        contentSecondary: {
            color: primaryColorTokens['color-secondary-medium'],
            userSelect: "none",
        },

        contentDisabled: {
            color: primaryColorTokens['color-tertiary-lower'],
        },


        pressable: {
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

        dot: {
            width: 8,
            height: 8,
            backgroundColor: primaryColorTokens['color-primary-medium'],
            borderRadius: "50%"
        },

        labelContainer: {
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center"
        }
    })
}

const getBorderGradient = (type: 'primary' | 'secondary' | 'tertiary' | 'back' | 'verticalIcon', state?: 'none' | 'disabled' | 'active' | 'accent') => {

    if (type === "verticalIcon" && state === "accent") {
        return primaryColorTokens["primart-accent-border"]
    }


    if (type === "back") {
        return primaryColorTokens["gradient-border-2"]
    }

    if (type === "tertiary" && state === "active") {
        return primaryColorTokens["gradient-border-3"]
    }

    if (type === "tertiary") {
        primaryColorTokens["gradient-border-4"]
    }

    return primaryColorTokens["gradient-border-1"]


}

const Button: React.FC<CustomButtonProps> = (props) => {
    const [isPressed, setIsPressed] = useState(false)

    const {
        type,
        state,
        icon: iconName,
        children,
        label,
        style,
        overridePadding: overrideWidth,
        ...rest
    } = props

    const styles = createStyles(type, state)

    const iconColor = state === "disabled"
        ? styles.contentDisabled.color : state === "active" ?
            styles.contentSecondary.color : styles.content.color

    const borderGradient = getBorderGradient(type, state)

    return <Pressable
        onPressIn={() => {
            setIsPressed(true)
        }}
        onPressOut={() => {
            setIsPressed(false)
        }}
        style={[
            // {width: overrideWidth},
            styles.pressable,
            /**
             * 
             * As we already send the information in creteStyle with the current type, we sould build the correct style object, we sould only have 
             * 
             * 
             *  ```jsx
             *  tyles.default,
             *  isPressed && styles.pressed,
             *  state == "disabled" && styles.desabled
             *  ``` 
             * 
             * And the style should already have the right value.
             * 
             * As react rebuild the whole component at each rerenders, it should be possible to move isPressed and state conditions in the style part.
             */
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
                state == "disabled" && styles.secondaryDisabled,
            ],
            type === "tertiary" && [
                styles.tertiary,
            ],
            style
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
                {paddingHorizontal:overrideWidth},
                /**
                 * 
                 * As we already send the information in creteStyle with the current type, we sould build the correct style object, we sould only have 
                 * 
                 * 
                 *  ```jsx
                 *  tyles.default,
                 *  isPressed && styles.pressed,
                 *  state == "disabled" && styles.desabled
                 *  ``` 
                 * 
                 * And the style should already have the right value.
                 */
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
                    name={iconName.name} />
            }
            {
                label
                    ? <View
                        style={
                            styles.labelContainer
                        }>
                        {
                            type === "verticalIcon"
                            && state === "accent"
                            && (
                                <View
                                    style={
                                        styles.dot
                                    }>

                                </View>
                            )
                        }

                        <Text
                            style={[
                                styles.content,
                                state == "disabled" && styles.contentDisabled,
                                state == "active" && styles.contentSecondary,
                            ]}
                        >{label}</Text>
                    </View>
                    : children
            }
        </View>
    </Pressable>
}

export default Button
export { Button };

