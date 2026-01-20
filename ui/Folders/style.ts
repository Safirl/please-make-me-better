import Fonts from "@/assets/styles/fonts";
import { StyleSheet } from "react-native";
// import { primaryFontTokens } from "@/assets/tokens/primary/font.tokens";
import {
    COMPONENT_NAME,
    clientRequestTabTokens,
} from "./tokens";



const main = (selectColor: "primary" | "secondary" | "tertiary" = "tertiary") => ({

    width: "100%" as const,
    alignSelf: "flex-start" as const,

    backgroundColor: clientRequestTabTokens[`${COMPONENT_NAME}-main-background-color`],

    paddingTop: 32,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: clientRequestTabTokens[`${COMPONENT_NAME}-main-border-color-${selectColor}`],
    zIndex: 0

})



export const createStyle = (selectColor: "primary" | "secondary" | "tertiary" = "tertiary") => StyleSheet.create({
    main: main(selectColor),

    back: {
        position: "absolute" as const,
        top: 0,


    },
    btnLabel: {
        ...Fonts.paragraph,
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        zIndex: 1
    },
    folderSection: {
        backgroundColor: clientRequestTabTokens[`${COMPONENT_NAME}-folderSection-background-color`],

        height: 243,
        gap: 12,

        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 24,
        paddingRight: 24,

        borderRadius: 5

    }
})





