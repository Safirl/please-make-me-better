import {StyleSheet} from "react-native";

import {primaryColorTokens} from "@/assets/tokens/primary/colors.tokens";
import {primaryFontTokens} from "@/assets/tokens/primary/font.tokens";
import Fonts from "@/assets/styles/fonts"
import {
    COMPONENT_NAME,
    clientRequestCardTokens,
} from "./tokens"

const outOfFlowOffset = 10

const main = (selectColor: "primary" | "secondary" | "tertiary") => ({
    gap: 16,
    backgroundColor: clientRequestCardTokens[`${COMPONENT_NAME}-main-background-color`],
    flexDirection: "row" as const,
})


export const createStyle = (selectColor: "primary" | "secondary" | "tertiary" = "tertiary") => StyleSheet.create({
    main: main(selectColor),
    indicators: {
        gap: 4,
    },
    selectedIndicator: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: clientRequestCardTokens[`${COMPONENT_NAME}-color-accent-${selectColor}`]
    },
    countIndicator: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,

        marginTop: -outOfFlowOffset,

        borderRadius: 4,
        borderWidth: 1,
        borderColor: clientRequestCardTokens[`${COMPONENT_NAME}-count-border-color-${selectColor}`]
    },
    countIndicatorLabel: {
        ...(() => selectColor === "tertiary" ? Fonts.paragraph : {
            ...Fonts.bodyBold,
            color: clientRequestCardTokens[`${COMPONENT_NAME}-color-accent-${selectColor}`]
        })(),
    }
})





