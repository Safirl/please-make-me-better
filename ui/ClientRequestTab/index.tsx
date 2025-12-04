import type {
    PressableProps,
} from "react-native";
import {
    Pressable, Text, StyleSheet
} from "react-native";

interface CustomButtonProps extends PressableProps {
    isSelected: boolean;
    title: string;
    paragraph: string;
    onPress: () => void;
}

const titleFont = {
    fontSize: 14,
    // height: 12,
    lineHeight: 12,
    fontWeight: "700" as const,
    fontFamily: "JetBrain Mono",
    letterSpacing: 0,

}
const paragraphFont = {
    FontSize: 12,
    // height: 12,
    lineHeight: 12,
    fontWeight: "400" as const,
    fontFamily: "JetBrain Mono",
    letterSpacing: 0,
    width: 270,

}
const container = {
    gap: 12,
    borderWidth: 1,
    paddingTop: 8,
    paddingRight: 32,
    paddingLeft: 32,
    paddingBottom: 16,
    borderRadius: 5,
}

const Style = StyleSheet.create({
    container,
    titleFont,
    paragraphFont,

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
        style={Style.container}
        {...rest}
    >

        {title && <Text style={Style.titleFont}>{title} // </Text>}
        {paragraph && <Text style={Style.paragraphFont}>{paragraph}</Text>}

    </Pressable>
}
export default ClientRequestTab