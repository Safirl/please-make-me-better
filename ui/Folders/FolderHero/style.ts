import { StyleSheet } from "react-native";

import Fonts from "@/assets/styles/fonts";
import { primaryFontTokens } from "@/tokens/primary/font.tokens";

const titleFont = {
    ...Fonts.subTitle,
    paddingBottom: 8
}
const paragraphFont = {
    ...Fonts.paragraph,
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





