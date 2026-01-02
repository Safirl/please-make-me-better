import { StyleSheet } from "react-native";

import Fonts from "@/assets/styles/fonts";
import { primaryTokens } from "@/tokens/primary/primary.token";



export const createStyle = () => StyleSheet.create({
    main: {
        flexDirection: "row",
        gap: 32,
        alignItems: "stretch" as const,
    },
    textArea: {
        flex: 1
    },
    image: {
        width: 112,
        height: 209
    },
    title: {
        ...Fonts.paragraph,
        paddingTop: 26
    },
    subTitle: {
        ...Fonts["h2"],
        paddingBottom: 12,
        paddingTop: 32,
    },
    paragraph: {
        ...Fonts.paragraph,
        color: primaryTokens["color-tertiary-lower"],
    },
    accentParagraph: {
        color: primaryTokens["color-secondary-high"],
    },
    marker: {
        position: "absolute",
        top: 21,
        left: -50
    }
})





