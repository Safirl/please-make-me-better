import { ColorValue } from "react-native"
import { primaryTokens } from "../primary/primary.token"
/**
 * This file include the component token for buntton
 */








const tokensBase = {
    "button-border-radius": primaryTokens["radius-nl"],
    "button-border-gradient": primaryTokens["gradient-border-1"]
}
const primaryBase = {
    "button-primary-text": primaryTokens["color-white"],
    "button-primary-icon": primaryTokens["color-white"]

}
const primaryDefault = {
    "button-primary-background": primaryTokens["color-primary-medium"] as ColorValue,

}
const primaryHover = {
    "button-primary-background": primaryTokens["color-primary-high"],
}
const primaryDisabled = {
    "button-primary-background": primaryTokens["color-tertiary-low"],
}


const tokensDanger = {

}





export const tokens = {
    base: tokensBase,
    primary: {
        base: primaryBase,
        default: primaryDefault,
        primaryHover: primaryHover
    },
}
