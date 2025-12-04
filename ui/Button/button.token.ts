/**
 * This file include the component token for buntton
 */


const primaryColorTokens = { // Later from primary tokens file
    "color-primary-high": "#684CF4",
    "color-primary-medium": "#8770F9",
    "color-primary-low": "#A897FB",

    "color-secondary-high": "#15FC80",
    "color-secondary-medium": "#6FFFB2",
    "color-secondary-low": "#DEFFED",

    "color-tertiary-high": "#050507",
    "color-tertiary-medium": "#1D1E22",
    "color-tertiary-low": "#39393D",
    "color-tertiary-lower": "#969696",
    "color-tertiary-lowest": "#BFBFBF",

    "color-danger-high": "#EB5557",

    "color-warning-high": "#FFA45B",

    "color-white": "#F1F1F1",





    "color-tertiary": "rgba(134, 112, 249, 1)",
    "radius-nl": "4px",

    "gradient-semantic2define-1": "linear-gradient(180deg, #6B6B6B 0%, rgba(153, 153, 153, 0) 100%)",
}

const primaryBackgroundTokens = {

    "background-primary": primaryColorTokens["color-tertiary-high"],
    "background-secondary": primaryColorTokens["color-tertiary-medium"],
    "background-tertiary": primaryColorTokens["color-tertiary-low"],

}


const primaryTokens = {
    ...primaryColorTokens,
    ...primaryBackgroundTokens
}



const tokensBase = {
    "button-border-radius": primaryTokens["radius-nl"],
    "button-border-gradient": primaryTokens["gradient-semantic2define-1"]
}
const primaryBase = {
    "button-primary-text": primaryTokens["color-white"],
    "button-primary-icon": primaryTokens["color-white"]

}
const primaryDefault = {
    "button-primary-background": primaryTokens["color-primary-medium"],

}
const primaryHover = {
    "button-primary-background": primaryTokens["color-primary-high"],
}
const primaryDisabled = {
    "button-primary-background": primaryTokens["color-tertiary-low"],
}


const tokensDanger = {

}





const tokens = {
    base: tokensBase,
    primary: {
        base: primaryBase,
        default: primaryDefault,
        primaryHover: primaryHover
    },
}