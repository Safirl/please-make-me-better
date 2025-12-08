import {StyleSheet} from "react-native";

import {primaryColorTokens} from "@/tokens/primary/colors.tokens";
import {primaryFontTokens} from "@/tokens/primary/font.tokens";
import Fonts from "@/assets/styles/fonts"
import {
    COMPONENT_NAME,
    clientRequestListTokens,
} from "./tokens"

const outOfFlowOffset = 10

export const createStyle = () => StyleSheet.create({
    main: {
        gap: outOfFlowOffset + 24,
        backgroundColor: clientRequestListTokens[`${COMPONENT_NAME}-main-background-color`],
        padding: 16,
    },
    title: {
        ...Fonts["h1"]
    },
    list: {
        gap: outOfFlowOffset + 12,
    }
})





