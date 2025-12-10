import { StyleSheet } from "react-native";

import Fonts from "@/assets/styles/fonts";
import { primaryTokens } from "@/tokens/primary/primary.token";

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
        gap: 16,
    },
    row: {
        flexDirection: "row",
        gap: 16,
        alignItems: "center" as const
    },
    name: {
        ...Fonts.paragraph,
        lineHeight: 22,
        fontSize: 14
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





