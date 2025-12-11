import { StyleSheet } from "react-native";

import Fonts from "@/assets/styles/fonts";
import { primaryFontTokens } from "@/tokens/primary/font.tokens";
import {
    COMPONENT_NAME,
    clientRequestTabTokens,
} from "./tokens";

const titleFont = {
    ...Fonts.subTitle,
}
const paragraphFont = {
    ...Fonts.paragraph,
    width: 270,
    color: primaryFontTokens["font-color-secondary"]
}
const main = (selectColor: "primary" | "secondary" | "tertiary" = "tertiary") => ({

    width: "100%" as const,
    backgroundColor: clientRequestTabTokens[`${COMPONENT_NAME}-main-background-color`],

    paddingTop: 32,
    paddingRight: 12,
    paddingLeft: 12,
    paddingBottom: 12,

    borderWidth: 1,
    borderRadius: 5,
    borderColor: clientRequestTabTokens[`${COMPONENT_NAME}-main-border-color-${selectColor}`],
    zIndex: 0
})


const borderTop = {
    position: "absolute" as const,
    flex: 1,
    top: 0,
    left: 0,
    transform: [{ translateY: -11.5 }, { translateX: -1 }],
}

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
        // transform: [{ translateX: "-50%" }, { translateY: "-50%" }]

    }
})





