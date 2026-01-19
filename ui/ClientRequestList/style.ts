import {StyleSheet} from "react-native";

import {primaryColorTokens} from "@/assets/tokens/primary/colors.tokens";
import {primaryFontTokens} from "@/assets/tokens/primary/font.tokens";
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
        borderRadius: clientRequestListTokens[`${COMPONENT_NAME}-border-radius`],
    },
    title: {
        ...Fonts["h1"]
    },
    list: {
        gap: outOfFlowOffset + 12,
        borderRadius: clientRequestListTokens[`${COMPONENT_NAME}-border-radius`],
    },
    outline: {
        padding: 1,
        borderRadius: clientRequestListTokens[`${COMPONENT_NAME}-border-radius`],
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -100,
        borderRadius: clientRequestListTokens[`${COMPONENT_NAME}-border-radius`],
    }
})





