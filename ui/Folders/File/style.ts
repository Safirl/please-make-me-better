import { StyleSheet } from "react-native";

import Fonts from "@/assets/styles/fonts";
import { primaryTokens } from "@/tokens/primary/primary.token";



export const createStyle = () => StyleSheet.create({
    main: {
        flexDirection: "row",
        gap: 32,
        alignItems: "stretch" as const,
    },
    leftSection: {
        paddingTop: 16,
        alignItems: "center"
    },
    textArea: {
        flex: 1
    },
    image: {
        width: 112,
        height: 209
    },
    title: {
        ...Fonts["h2"],
        paddingVertical: 10
    },
    hr: {
        backgroundColor: primaryTokens["color-tertiary-low"],
        margin: 0,
        width: 375,
        height: 1,
        marginBottom: 12
    },
    subTitle: {
        paddingBottom: 12,
        paddingTop: 32,
    },
    sectionName: {
        ...Fonts.paragraph,
        paddingVertical: 8,
    },
    paragraph: {
        ...Fonts.paragraph,
        color: primaryTokens["color-tertiary-lower"],
    },
    accentParagraph: {
        color: primaryTokens["color-secondary-high"],
        paddingVertical: 4,

    },
    marker: {
        position: "absolute",
        top: 21,
        left: -50
    },
    btnContainer: {
        paddingTop: 12,
        width: 150,
    }
})





