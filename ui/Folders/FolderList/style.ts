import { StyleSheet } from "react-native";

import Fonts from "@/assets/styles/fonts";
import { primaryTokens } from "@/assets/tokens/primary/primary.token";

const titleFont = {
    ...Fonts.subTitle,
    paddingBottom: 8
}
const labelFont = {
    ...Fonts.paragraph,
    // color: primaryFontTokens["font-color-secondary"],
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 24,
    paddingRight: 24,
}
const main = () => ({
    flexDirection: "row" as const,
    gap: 32,
    alignItems: "center" as const
})



export const createStyle = () => StyleSheet.create({
    main: {
        gap: 12,
        alignItems: "stretch" as const
    },
    row: {
        flexDirection: "row",
        gap: 10,
        flexShrink: 1,
        alignItems: "center" as const,
    },
    item: {
        flex: 1,
    },
    name: {
        ...Fonts.paragraph,
        height: 12,
        color: primaryTokens["color-tertiary-lower"],
    },
    label: {
        ...Fonts.paragraph,
        lineHeight: 22,
        backgroundColor: primaryTokens["color-tertiary-medium"],
        paddingBottom: 4,
        paddingTop: 4,
        paddingLeft: 24,
        paddingRight: 24,
        borderRadius: 4,
    },
    locked: {
        backgroundColor: "#612527"
    },
    neutral: {
    }
})





