import {StyleSheet} from "react-native";

import {primaryColorTokens} from "@/tokens/primary/colors.tokens";
import {primaryFontTokens} from "@/tokens/primary/font.tokens";
import Fonts from "@/assets/styles/fonts"
import {
    COMPONENT_NAME,
    clientRequestTabTokens,
} from "./tokens"

const titleFont = {
    ...Fonts.subTitle,
}
const paragraphFont = {
    ...Fonts.paragraph,
    width: 270,
    color: primaryFontTokens["font-color-secondary"]
}
const main = (selectColor?: "primary" | "secondary" | "tertiary") => ({
    gap: 12,
    borderWidth: 1,
    paddingTop: 8,
    paddingRight: 32,
    paddingLeft: 32,
    paddingBottom: 16,
    borderRadius: 5,
    borderColor: selectColor ? clientRequestTabTokens[`${COMPONENT_NAME}-main-border-color-${selectColor}`] : clientRequestTabTokens[`${COMPONENT_NAME}-main-border-color-tertiary`],
    backgroundColor: clientRequestTabTokens[`${COMPONENT_NAME}-main-background-color`]
})

const borderTop = {
    position: "absolute" as const,
    flex: 1,
    top: 0,
    left: 0,
    transform: [{translateY: -11.5}, {translateX: -1}],
}

export const createStyle = (selectColor?: "primary" | "secondary" | "tertiary") => StyleSheet.create({
    main: main(selectColor),
    titleFont,
    paragraphFont,
    borderTop
})





