import {primaryColorTokens} from "@/tokens/primary/colors.tokens";

export const primaryFontTokens = {
    "font-family-primary": "JetBrainsMono" as const,
    "font-color-primary": primaryColorTokens["color-white"],
    "font-color-secondary": primaryColorTokens["color-tertiary-lower"],
    "font-color-tertiary": primaryColorTokens["color-tertiary-high"],
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

export const h1FontTokens = {
    "font-h1-line": 22 as const,
    "font-h1-weight": "400" as const,
    "font-h1-family": primaryFontTokens["font-family-primary"],
    "font-h1-size": 18 as const,
    "font-h1-letterSpacing": 0 as const,
}

export const h2FontTokens = {
    "font-h2-line": 22 as const,
    "font-h2-weight": "400" as const,
    "font-h2-family": primaryFontTokens["font-family-primary"],
    "font-h2-size": 16 as const,
    "font-h2-letterSpacing": 0 as const,
}
export const fontTokens = {
    primary: primaryFontTokens,
    ...subTitleFontTokens,
    ...paragraphFontTokens,
    ...bodyBoldFontTokens,
    ...h1FontTokens,
    ...h2FontTokens,
}

