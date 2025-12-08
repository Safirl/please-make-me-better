import type {
    ViewProps,
} from "react-native";
import {
    Pressable, View, Text,
} from "react-native";
import {createStyle} from "./style";
import ClientRequestTab from "@/ui/ClientRequestTab";

interface CustomButtonProps extends ViewProps {
    selectColor?: "primary" | "secondary" | "tertiary";
    title: string;
    paragraph: string;
    count: string
    onPress: () => void;
}


const ClientRequestCard: React.FC<CustomButtonProps> = (props) => {

    const {
        selectColor,
        title,
        paragraph,
        count,
        onPress,
        ...rest
    } = props

    const Style = createStyle(selectColor);

    return <Pressable
        style={Style.main}
        onPress={onPress}
        {...rest}
    >
        <View style={Style.indicators}>
            <View style={Style.countIndicator}>
                <Text style={Style.countIndicatorLabel}>{count}</Text>
            </View>
            <View style={Style.selectedIndicator}>
            </View>
        </View>

        <ClientRequestTab
            selectColor={selectColor}
            title={title}
            paragraph={paragraph}
        />
    </Pressable>
}
export default ClientRequestCard