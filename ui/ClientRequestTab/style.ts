import { StyleSheet } from "react-native";

import {primaryColorTokens} from "@/tokens/primary/colors.tokens";

const titleFont = {
    fontSize: 14,
    lineHeight: 12,
    fontWeight: "700" as const,
    fontFamily: "JetBrainsMono",
    letterSpacing: 0,
    color: primaryColorTokens["color-white"]
}
const paragraphFont = {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "400" as const,
    fontFamily: "JetBrainsMono",
    letterSpacing: 0,
    width: 270,
    color: primaryColorTokens["color-tertiary-lower"]
}
const main = (selectColor?: "primary" | "secondary" | "tertiary") => ({
    gap: 12,
    borderWidth: 1,
    paddingTop: 8,
    paddingRight: 32,
    paddingLeft: 32,
    paddingBottom: 16,
    borderRadius: 5,
    borderColor: selectColor ? primaryColorTokens[`color-${selectColor}-high`] : "transparent",
    backgroundColor: primaryColorTokens["color-tertiary-medium"]
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





