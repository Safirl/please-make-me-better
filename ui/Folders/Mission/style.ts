import { StyleSheet } from "react-native";

import Fonts from "@/assets/styles/fonts";
import { primaryTokens } from "@/tokens/primary/primary.token";



export const createStyle = () => StyleSheet.create({
    main: {
        gap: 12,
        maxWidth: 443
    },


    line: {
        flex: 1,
        gap: 4,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    headingTextSection: {
        gap: 4
    },
    title: {
        ...Fonts["h2"],
    },

    paragraph: {
        ...Fonts.paragraph,
        alignItems: "center",
    },
    secondaryText: {
        color: primaryTokens["color-tertiary-lower"],
    },

    btnContainer: {
        paddingTop: 12,
        width: 150,
    },
    mission: {

        borderRadius: 4,
        borderColor: primaryTokens["color-tertiary-lower"],
        borderWidth: 1,

    },
    verticalMissionContainer: {
        gap: 4
    },
    lineDirection: {
        flexDirection: "row",
        gap: 14,
        alignItems: "center",
        width: 230,

        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    columnDirection: {
        width: 210,
        gap: 14,
        paddingVertical: 24,
        paddingHorizontal: 14
    }
})





