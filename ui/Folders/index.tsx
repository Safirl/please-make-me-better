import React, { Dispatch, SetStateAction } from "react";
import type { ViewProps } from "react-native";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Button from "../Button";
import ContentGrid from "./ContentGrid";
import FolderHero from "./FolderHero";
import { createStyle } from "./style";
import { clientRequestTabTokens, COMPONENT_NAME } from "./tokens";
import FolderList from "./FolderList/index"
import Identity from "./Identity"
import File from "./File"
import Mission from "./Mission"
interface CustomModalProps extends ViewProps {
    selectColor?: "primary" | "secondary" | "tertiary";
    type: '' | ''
    currentView?: "" | "identity" | "mission" | "image" | "autrui" | "rupture"
    tabs: ('Dossier' | "Lore")[]
    client: {
        name: string
        request: string
        work: string
        age: string
        profilePicture: string
    }
    gridContent: {
        name: string
        labels: {
            label: string
            status: "locked" | "neutral"
        }[]
    }[]

    configure: () => void
}


const Modal: React.FC<CustomModalProps> = (props) => {

    const {
        selectColor = "tertiary",
        currentView = "",
        tabs,
        client,
        gridContent,
        configure,
        ...rest
    } = props

    const Style = createStyle(selectColor);

    console.log(tabs)
    const [selectedTab, setSelectedTab] = React.useState<"Dossier" | "Lore">(tabs[0])
    const [selectedView, setSelectedView] = React.useState<"" | "identity" | "mission" | "image" | "autrui" | "rupture">(currentView)
    const [backButtonWidth, setBackButtonWidth] = React.useState()
    const [backButtonHeight, setBackButtonHeight] = React.useState()
    const [history, setHistory] = React.useState<Array<"" | "identity" | "mission" | "image" | "autrui" | "rupture">>([])



    const image = {
        title: "Le conflit avec le miroir",
        sectionName: "Image de soi",
        next: () => { setSelectedView("autrui") },
        parahraph: [
            [
                {
                    text: "Mia développe une dysmorphie.",
                    style: 'accent' as const
                },

            ],
            [
                {
                    text: "Elle a envisagé la transformation physique comme solution.",
                    style: "neutral" as const
                },

                {
                    text: "La chirurgie devient une tentative pour se conformer.",
                    style: "accent" as const
                },
            ],
            [
                {
                    text: "Mais malgré les changements, rien ne s'apaise.",
                    style: "neutral" as const
                },
            ],
            [
                {
                    text: "Le sentiment d'échec persiste.",
                    style: "neutral" as const
                },
            ]
        ]
    }


    const autrui = {
        title: "La validation comme piège",
        sectionName: "Autrui",
        next: () => { setSelectedView("rupture") },
        parahraph: [
            [
                {
                    text: "Mia cherche alors la validation extérieure.",
                    style: 'accent' as const
                },

            ],
            [
                {
                    text: "Le regard des autres devient un repère. Elle intériorise les jugements. Les attentes des autres prennent le pas sur sa propre voix.",
                    style: "neutral" as const
                },

                {
                    text: "Peu à peu, elle s'oublie.",
                    style: "accent" as const
                },
            ],
        ]
    }


    const rupture = {
        title: "Le moment de bascule",
        sectionName: "Rupture",
        next: () => { setSelectedView("mission") },
        parahraph: [
            [
                {
                    text: "Mia comprend qu'elle ne veut plus changer son corps.",
                    style: 'neutral' as const
                },
                {
                    text: "Elle veut être comprise.",
                    style: 'accent' as const
                }
            ],
            [
                {
                    text: "Le regard des autres devient un repère. Elle intériorise les jugements. Les attentes des autres prennent le pas sur sa propre voix.",
                    style: "neutral" as const
                },

                {
                    text: "Elle aspire à des relations sincères, où son apparence n'est plus centrale.",
                    style: "accent" as const
                },
            ],
            [
                {
                    text: "C'est ici que votre rôle commence.",
                    style: "accent2" as const

                }
            ]
        ]
    }

    const obj = {
        image,
        autrui,
        rupture
    }


    React.useEffect(() => {

        if (!selectedView) {
            setSelectedView("")
        }


        setHistory(h => [
            ...h,
            selectedView
        ])

    }, [selectedView])


    return <View
        style={{
            width: "100%"
        }}
        {...rest}
    >



        <View
            style={[Style.back, {
                transform: [{ translateY: -(backButtonHeight || 0) - 5 }],
                opacity: history[history.length - 1] === "" ? 0 : 1
            }]}
            onLayout={(e) => {
                if (!backButtonWidth) setBackButtonWidth(e.nativeEvent.layout.width as any);
                if (!backButtonHeight) setBackButtonHeight(e.nativeEvent.layout.height as any);
            }}
        >

            <Button
                type="back"
                label={"< retour"}
                onPress={() => {
                    if (history[history.length - 1] !== "") {
                        setSelectedView(history[history.length - 2])
                        setHistory((h) => {
                            return h.slice(0, -2)
                        })
                    }
                }}
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
                    selectColor={selectColor}
                />
            })
        }


        <View
            style={Style.main}
        >
            {
                selectedTab === "Dossier" && <View
                    style={Style.folderSection}
                >
                    {
                        selectedView === "" && <>
                            <FolderHero
                                client={client}
                                configure={() => {
                                    setSelectedView("identity")
                                }}
                            />

                            <FolderList
                                title={"Consulter ses dossiers"}
                                setSelectedView={setSelectedView}
                                folders={[
                                    {
                                        label: "Votre mission",
                                        state: "accent",
                                        id: "mission"
                                    },
                                    {
                                        label: "Image de soi",
                                        id: "image"
                                    },
                                    {
                                        label: "Autrui",
                                        id: "autrui"
                                    },
                                    {
                                        label: "Rupture",
                                        id: "rupture"
                                    }
                                ]}
                            />
                        </>

                    }

                    {
                        selectedView === "identity" && <><Identity /></>
                    }

                    {
                        selectedView === "mission" && <Mission configure={configure} />
                    }

                    {
                        (
                            selectedView === "autrui"
                            || selectedView === "image"
                            || selectedView === "rupture"
                        ) && <><File
                            title={obj[selectedView].title}
                            sectionName={obj[selectedView].sectionName}
                            parahraph={obj[selectedView].parahraph}
                            next={obj[selectedView].next}
                        /></>
                    }


                </View>
            }

        </View>

    </View >
}
export default Modal




const Tab = (
    { Style, label, index, selected, offset, selectColor, setSelectedTab }:
        {
            Style: any, label: "Dossier" | "Lore", index: number, selected: boolean, offset: number, selectColor: "primary" | "secondary" | "tertiary";
            setSelectedTab: Dispatch<SetStateAction<"Dossier" | "Lore">>
        }
) => {


    const [labelWidth, setLabelWidth] = React.useState(null);
    const [buttonWidth, setButtonWidth] = React.useState(null);
    const [buttonHeight, setButtonHeight] = React.useState(null);

    return <Pressable
        onLayout={(e) => {
            if (!buttonWidth) setButtonWidth(e.nativeEvent.layout.width as any);
            if (!buttonHeight) setButtonHeight(e.nativeEvent.layout.height as any);
        }}
        onPress={() => setSelectedTab(label)}
        style={[{
            zIndex: selected ? clientRequestTabTokens[`${COMPONENT_NAME}-tab-selected-index`] : clientRequestTabTokens[`${COMPONENT_NAME}-tab-not-selected-index`]
        }, {
            position: "absolute" as const,

            top: 0,
            left: labelWidth ? offset + index * (buttonWidth || 0) - (index + 1) * 3 : 0,
            transform: [{ translateY: - (buttonHeight || 0) + 1 }],
            flexDirection: "row",
        }]}
    >

        <Text
            onLayout={(e) => {
                if (!labelWidth) setLabelWidth(e.nativeEvent.layout.width as any);
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
        >
            <Path d="M1.13379 35.5358L0 40.3739L174.863 38.8802V35.4773L172.417 35.077L169.725 33.3867L168.436 31.4962L159.961 5.66034L159.069 3.52853L157.375 1.63863L155.455 0.671006L153.822 0.383728H40.8214H15.7085L13.0778 0.655871L11.2181 1.82005L9.23748 4.45079L8.60248 6.24996V22.6694V26.177L8.39081 29.1858L7.4383 31.9526L4.97387 34.4019L2.64552 35.3393L1.13379 35.5358Z"
                fill={
                    selected
                        ? clientRequestTabTokens[`${COMPONENT_NAME}-tab-selected-color`]
                        : clientRequestTabTokens[`${COMPONENT_NAME}-tab-not-selected-color`]
                }
            />
            <Path
                d="M174.938 35.4C171.736 35.3999 168.897 33.339 167.903 30.2945L159.635 4.95272C158.749 2.23735 156.217 0.400039 153.36 0.399994H15.1221C11.477 0.399994 8.52247 3.35452 8.52247 6.9996V27.9996C8.52247 32.0865 5.20897 35.4 1.12207 35.4"
                stroke={clientRequestTabTokens[`${COMPONENT_NAME}-main-border-color-${selectColor}`]}
                stroke-width="0.8" />
        </Svg>
    </Pressable>
}