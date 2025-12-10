import ClientRequestTab from "@/ui/ClientRequestTab";
import type {
    PressableProps,
} from "react-native";
import {
    Pressable,
    Text,
    View,
} from "react-native";
import { createStyle } from "./style";

interface CustomButtonProps extends PressableProps {
    selectColor?: "primary" | "secondary" | "tertiary";
    title: string;
    paragraph: string;
    count: string
}


const ClientRequestCard: React.FC<CustomButtonProps> = (props) => {

    const {
        selectColor = "tertiary",
        title,
        paragraph,
        count,
        ...rest
    } = props

    const Style = createStyle(selectColor);

    return <Pressable
        style={Style.main}
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