import {primaryColorTokens} from "@/tokens/primary/colors.tokens";

export const primaryFontTokens = {
    "font-family-primary": "JetBrainsMono" as const,
    "font-color-primary": primaryColorTokens["color-white"],
    "font-color-secondary": primaryColorTokens["color-tertiary-lower"],
}

export const subTitleFontTokens = {
    "font-subTitle-size": 14 as const,
    "font-subTitle-weight": "700" as const,
    "font-subTitle-family": primaryFontTokens["font-family-primary"],
    "font-subTitle-line": 12 as const,
    "font-subTitle-letterSpacing": 0 as const,
}

export const paragraphFontTokens = {
    "font-paragraph-size": 12 as const,
    "font-paragraph-weight": "400" as const,
    "font-paragraph-family": primaryFontTokens["font-family-primary"],
    "font-paragraph-line": 12 as const,
    "font-paragraph-letterSpacing": 0 as const,
}

export const bodyBoldFontTokens = {
    "font-body-bold-size": 12 as const,
    "font-body-bold-weight": "800" as const,
    "font-body-bold-family": primaryFontTokens["font-family-primary"],
    "font-body-bold-line": 12 as const,
    "font-body-bold-letterSpacing": 0 as const,
}

export const fontTokens = {
    primary: primaryFontTokens,
    ...subTitleFontTokens,
    ...paragraphFontTokens,
    ...bodyBoldFontTokens,
}

