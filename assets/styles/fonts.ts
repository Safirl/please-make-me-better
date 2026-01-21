import { fontTokens } from "@/assets/tokens/primary/font.tokens";

const createFont = (style: "paragraph" | "subTitle" | "body-bold" | "h1" | "h2" | "subTitleLight") => {
    return {
        fontSize: fontTokens[`font-${style}-size`],
        lineHeight: fontTokens[`font-${style}-line`],
        fontWeight: fontTokens[`font-${style}-weight`],
        fontFamily: fontTokens[`font-${style}-family`],
        letterSpacing: fontTokens[`font-${style}-letterSpacing`],
        color: fontTokens.primary[`font-color-primary`],
    }
}


export default {
    paragraph: {
        ...createFont("paragraph")
    },
    subTitle: {
        ...createFont("subTitle")
    },
    subTitleLight: {
        ...createFont("subTitleLight")
    },
    bodyBold: {
        ...createFont("body-bold")
    },
    "h1": {
        ...createFont("h1")
    },
    "h2": {
        ...createFont("h2")
    }
}