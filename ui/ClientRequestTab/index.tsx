import type {
    ViewProps,
} from "react-native";
import {
    Text,
    View
} from "react-native";
import Svg, { Path } from 'react-native-svg';
import { createStyle } from "./style";
import { clientRequestTabTokens, COMPONENT_NAME } from "./tokens";

interface CustomButtonProps extends ViewProps {
    selectColor?: "primary" | "secondary" | "tertiary";
    title: string;
    paragraph: string;
}


const ClientRequestTab: React.FC<CustomButtonProps> = (props) => {

    const {
        selectColor = "tertiary",
        title,
        paragraph,
        ...rest
    } = props

    const Style = createStyle(selectColor);

    return <View
        style={Style.main}
        {...rest}
    >
        <View
            style={Style.borderTop}
        >
            <Svg width="169" height="19" viewBox="0 0 169 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path
                    d="M1.03384 3.50479L0.532456 18.1936L168.799 11.4973V10.875L167.078 10.7105L151.714 0.679932L5.06496 1.02906L2.43036 1.21945L1.03384 3.50479Z"
                    fill={clientRequestTabTokens[`${COMPONENT_NAME}-main-border-color-tertiary`]}/>
                <Path
                    d="M5 0V1H150.791V0H5ZM153.661 0.906113L153.087 1.72489L165.386 10.3482L165.96 9.52943L153.661 0.906113ZM165.96 9.52943L165.386 10.3482C166.395 11.0559 167.598 11.4355 168.83 11.4355V10.4355C168.008 10.4355 166.633 10.0012 165.96 9.52943ZM150.791 0V1C151.613 1 152.414 1.2531 153.087 1.72489L153.661 0.906113C152.651 0.198432 152.024 0 150.791 0ZM5 0C1.68629 0 0 1.68629 0 5H1C1 2.79086 2.79086 1 5 1V0Z"
                    fill={clientRequestTabTokens[`${COMPONENT_NAME}-main-border-color-${selectColor}`]}/>
                <Path d="M1 5H0V18.4355H1V5Z"
                      fill={c}/>
            </Svg>


        </View>

        {title && <Text style={Style.titleFont}>{title} // </Text>}
        {paragraph && <Text style={Style.paragraphFont}>{paragraph}</Text>}

    </View>
}
export default ClientRequestTab