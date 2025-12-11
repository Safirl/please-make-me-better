import React from "react";
import type {
    ViewProps,
} from "react-native";
import {
    Pressable,
    Text,
    View
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Button from "../Button";
import { createStyle } from "./style";
import {
    clientRequestTabTokens,
    COMPONENT_NAME
} from "./tokens";
interface CustomModalProps extends ViewProps {
    selectColor?: "primary" | "secondary" | "tertiary";
    type: '' | ''
    tabs: ('Dossier' | "Lore")[]
}


const Modal: React.FC<CustomModalProps> = (props) => {

    const {
        selectColor = "tertiary",
        tabs,
        ...rest
    } = props

    const Style = createStyle(selectColor);

    const [selectedTab, setSelectedTab] = React.useState(tabs[0])
    const [backButtonWidth, setBackButtonWidth] = React.useState()
    const [backButtonHeight, setBackButtonHeight] = React.useState()

    return <View
        style={{
            width: "100%"
        }}
        {...rest}
    >



        <View
            style={[Style.back, {
                transform: [{ translateY: -(backButtonHeight || 0) - 5 }]
            }]}
            onLayout={(e) => {
                if (!backButtonWidth) setBackButtonWidth(e.nativeEvent.layout.width);
                if (!backButtonHeight) setBackButtonHeight(e.nativeEvent.layout.height);
            }}
        >
            <Button
                type="back"
                label={"< retour"}
            />
        </View>

        {
            tabs.map((tab, i) => {
                return <Tab
                    label={tab}
                    index={i}
                    Style={Style}
                    selected={selectedTab === tab}
                    setSelectedTab={setSelectedTab}
                    offset={backButtonWidth || 0}
                />
            })
        }


        <View
            style={Style.main}
        >
        </View>

    </View >
}
export default Modal




const Tab = ({ Style, label, index, selected, offset, setSelectedTab }: { Style: any, label: string, index: number, selected: boolean, offset: number, setSelectedTab: (v: string) => string }) => {


    const [labelWidth, setLabelWidth] = React.useState(null);
    const [buttonWidth, setButtonWidth] = React.useState(null);
    const [buttonHeight, setButtonHeight] = React.useState(null);

    return <Pressable
        onLayout={(e) => {
            if (!buttonWidth) setButtonWidth(e.nativeEvent.layout.width);
            if (!buttonHeight) setButtonHeight(e.nativeEvent.layout.height);
        }}
        onPress={() => setSelectedTab(label)}
        style={[{
            zIndex: selected ? clientRequestTabTokens[`${COMPONENT_NAME}-tab-selected-index`] : clientRequestTabTokens[`${COMPONENT_NAME}-tab-not-selected-index`]
        }, {
            position: "absolute" as const,

            top: 0,
            left: labelWidth ? offset + index * buttonWidth - (index + 1) * 3 : 0,
            transform: [{ translateY: - (buttonHeight || 0) + 1 }],
            flexDirection: "row",
        }]}
    >

        <Text
            onLayout={(e) => {
                if (!labelWidth) setLabelWidth(e.nativeEvent.layout.width);
            }}
            style={
                [Style.btnLabel,
                labelWidth && {
                    transform: [{ translateX: -labelWidth / 2 - index * 8 }, { translateY: "-50%" }]
                }
                ]
            }

        >
            {label}
        </Text>


        <Svg
            style={Style.svgs}
            transform={[{ translateX: -index * 8 }, { translateY: 2.5 + 2.84 }]}
            width="175"
            height="41"
            viewBox="0 0 175 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path d="M1.13379 35.5358L0 40.3739L174.863 38.8802V35.4773L172.417 35.077L169.725 33.3867L168.436 31.4962L159.961 5.66034L159.069 3.52853L157.375 1.63863L155.455 0.671006L153.822 0.383728H40.8214H15.7085L13.0778 0.655871L11.2181 1.82005L9.23748 4.45079L8.60248 6.24996V22.6694V26.177L8.39081 29.1858L7.4383 31.9526L4.97387 34.4019L2.64552 35.3393L1.13379 35.5358Z"
                fill={
                    selected
                        ? clientRequestTabTokens[`${COMPONENT_NAME}-tab-selected-color`]
                        : clientRequestTabTokens[`${COMPONENT_NAME}-tab-not-selected-color`]
                }
            />
            <Path d="M174.938 35.4C171.736 35.3999 168.897 33.339 167.903 30.2945L159.635 4.95272C158.749 2.23735 156.217 0.400039 153.36 0.399994H15.1221C11.477 0.399994 8.52247 3.35452 8.52247 6.9996V27.9996C8.52247 32.0865 5.20897 35.4 1.12207 35.4" stroke="#6FFFB0" stroke-width="0.8" />
        </Svg>
    </Pressable>
}