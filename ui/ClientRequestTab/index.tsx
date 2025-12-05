import type {
    PressableProps,
} from "react-native";
import {
    Pressable, Text, StyleSheet, View
} from "react-native";

import {primaryColorTokens} from "@/tokens/primary/colors.tokens";

interface CustomButtonProps extends PressableProps {
    isSelected: boolean;
    title: string;
    paragraph: string;
    onPress: () => void;
}

const titleFont = {
    fontSize: 14,
    lineHeight: 12,
    fontWeight: "700" as const,
    fontFamily: "JetBrainsMono",
    letterSpacing: 0,
    color: primaryColorTokens["color-white"]
}
const paragraphFont = {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "400" as const,
    fontFamily: "JetBrainsMono",
    letterSpacing: 0,
    width: 270,
    color: primaryColorTokens["color-tertiary-lower"]
}
const main = {
    gap: 12,
    borderWidth: 1,
    paddingTop: 8,
    paddingRight: 32,
    paddingLeft: 32,
    paddingBottom: 16,
    borderRadius: 5,
    borderColor: primaryColorTokens["color-secondary-high"],
    backgroundColor: primaryColorTokens["color-tertiary-medium"]
}

const borderTop = {
    position: "absolute" as const,
    flex: 1,
    top: 0,
    left: 0,
    transform: [{translateY: -11.5}, {translateX: -1}],
}

const Style = StyleSheet.create({
    main,
    titleFont,
    paragraphFont,
    borderTop
})


const ClientRequestTab: React.FC<CustomButtonProps> = (props) => {

    const {
        isSelected,
        title,
        paragraph,
        onPress,
        ...rest
    } = props


    return <Pressable
        style={Style.main}
        {...rest}
    >
        <View
            style={Style.borderTop}
        >
            <svg width="169" height="19" viewBox="0 0 169 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.03384 3.50479L0.532456 18.1936L168.799 11.4973V10.875L167.078 10.7105L151.714 0.679932L5.06496 1.02906L2.43036 1.21945L1.03384 3.50479Z"
                    fill={primaryColorTokens["color-tertiary-medium"]}/>
                <path
                    d="M5 0V1H150.791V0H5ZM153.661 0.906113L153.087 1.72489L165.386 10.3482L165.96 9.52943L153.661 0.906113ZM165.96 9.52943L165.386 10.3482C166.395 11.0559 167.598 11.4355 168.83 11.4355V10.4355C168.008 10.4355 166.633 10.0012 165.96 9.52943ZM150.791 0V1C151.613 1 152.414 1.2531 153.087 1.72489L153.661 0.906113C152.651 0.198432 152.024 0 150.791 0ZM5 0C1.68629 0 0 1.68629 0 5H1C1 2.79086 2.79086 1 5 1V0Z"
                    fill={primaryColorTokens["color-secondary-high"]}/>
                <path d="M1 5H0V18.4355H1V5Z" fill={primaryColorTokens["color-secondary-high"]}/>
            </svg>


        </View>

        {title && <Text style={Style.titleFont}>{title} // </Text>}
        {paragraph && <Text style={Style.paragraphFont}>{paragraph}</Text>}

    </Pressable>
}
export default ClientRequestTab