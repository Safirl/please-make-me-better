import { primaryColorTokens } from "@/tokens/primary/colors.tokens";

export const COMPONENT_NAME = "folder";

export const clientRequestTabTokens = {
    [`${COMPONENT_NAME}-main-background-color`]: primaryColorTokens["color-tertiary-low"],

    [`${COMPONENT_NAME}-main-border-color-primary`]: primaryColorTokens[`color-primary-medium`],
    [`${COMPONENT_NAME}-main-border-color-secondary`]: primaryColorTokens[`color-secondary-medium`],
    [`${COMPONENT_NAME}-main-border-color-tertiary`]: primaryColorTokens[`color-tertiary-medium`],
    
    [`${COMPONENT_NAME}-tab-selected-color`]: primaryColorTokens[`color-tertiary-low`],
    [`${COMPONENT_NAME}-tab-not-selected-color`]: primaryColorTokens[`color-tertiary-medium`],

    [`${COMPONENT_NAME}-tab-not-selected-index`]: -1,
    [`${COMPONENT_NAME}-tab-selected-index`]: 1,



}