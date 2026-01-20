import { StyleSheet } from "react-native";

import Fonts from "@/assets/styles/fonts";
import { primaryFontTokens } from "@/assets/tokens/primary/font.tokens";

const titleFont = {
    ...Fonts.subTitle,
    height: 12,
    minHeight: 12,
    marginBottom: 8,
    shrink: 0,
}
const paragraphFont = {
    ...Fonts.paragraph,
    shrink: 0,
    height: 12,
    minHeight: 12,
    color: primaryFontTokens["font-color-secondary"],
}
const main = () => ({
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    gap: 32,
    alignItems: "center" as const
})



export const createStyle = () => StyleSheet.create({
    main: main(),
    client: {
        flexDirection: "row" as const,
        gap: 20,

    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 4,
    },
    titleFont,
    paragraphFont
})





