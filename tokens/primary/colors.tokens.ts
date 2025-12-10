import { ColorValue } from "react-native";

export const primaryColorTokens = {
    "color-primary-high": "#684CF4" as ColorValue,
    "color-primary-medium": "#8770F9" as ColorValue,
    "color-primary-low": "#A897FB"as ColorValue,

    "color-secondary-high": "#15FC80"as ColorValue,
    "color-secondary-medium": "#6FFFB2"as ColorValue,
    "color-secondary-low": "#DEFFED"as ColorValue,

    "color-tertiary-high": "#050507"as ColorValue,
    "color-tertiary-medium": "#1D1E22"as ColorValue,
    "color-tertiary-low": "#39393D" as ColorValue,
    "color-tertiary-lower": "#969696"as ColorValue,
    "color-tertiary-lowest": "#BFBFBF"as ColorValue,

    "color-danger-high": "#EB5557"as ColorValue,

    "color-warning-high": "#FFA45B"as ColorValue,

    "color-white": "#F1F1F1"as ColorValue,





    "color-tertiary": "rgba(134, 112, 249, 1)" as const, // Should be removed
    "radius-nl": "4px" as const,

    // "gradient-border-1": "linear-gradient(180deg, #6B6B6B 0%, rgba(153, 153, 153, 0) 100%)" as ColorValue,
    "gradient-border-1": ['rgba(191, 191, 191, 1)', 'rgba(153, 153, 153, 0)'] as [ColorValue, ColorValue],
    "gradient-border-2": ['rgba(134, 112, 249, 1)', 'rgba(134, 112, 249, 0.25)'] as [ColorValue, ColorValue],
    "gradient-border-3": ["#6FFFB2", "#6FFFB2"] as [ColorValue, ColorValue],
    "gradient-border-4": ["#F1F1F1", "#F1F1F1"] as [ColorValue, ColorValue],
}
