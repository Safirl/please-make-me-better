import React, { Dispatch, SetStateAction } from "react";
import type { ViewProps } from "react-native";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import Button from "../Button";
import ContentGrid from "./ContentGrid";
import FolderHero from "./FolderHero";
import { createStyle } from "./style";
import { clientRequestTabTokens, COMPONENT_NAME } from "./tokens";
import FolderList from "./FolderList/index"
import Identity from "./Identity"
import File from "./File"
import Mission from "./Mission"
import { useParametersDisplayStateStorage } from "@/assets/scripts/storage/useParametersProgressStorage";
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

    configure?: () => void,
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

    const [selectedTab, setSelectedTab] = React.useState<"Dossier" | "Lore">(tabs[0])
    const [selectedView, setSelectedView] = React.useState<"" | "identity" | "mission" | "image" | "autrui" | "rupture">(currentView)
    const [backButtonWidth, setBackButtonWidth] = React.useState()
    const [backButtonHeight, setBackButtonHeight] = React.useState()
    const [history, setHistory] = React.useState<Array<"" | "identity" | "mission" | "image" | "autrui" | "rupture">>([])
    const isFolderVisible = useParametersDisplayStateStorage((state) => state.isFolderVisible)
    const setFolderVisibility = useParametersDisplayStateStorage((state) => state.setFolderVisibility)


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
            transform: [{ translateY: 16 }],

            flexDirection: "row",
            alignItems: "flex-end",
            gap: 10
        }}
    >

        {
            !isFolderVisible &&
            <View>
                <Svg
                    style={{
                        width: 45
                    }}
                    width="45" height="271" viewBox="0 0 45 271" fill="none"
                >
                    <Rect width="45" height="271" rx="6" fill="#050507" />
                    <Rect x="5.5" y="10.5" width="34" height="24" rx="3.5" stroke="#6FFFB0" />
                    <Path d="M15.693 26.5V18.47H18.3C18.8573 18.47 19.3413 18.5763 19.752 18.789C20.17 19.0017 20.4927 19.3023 20.72 19.691C20.9547 20.0723 21.072 20.5233 21.072 21.044V23.915C21.072 24.4283 20.9547 24.8793 20.72 25.268C20.4927 25.6567 20.17 25.961 19.752 26.181C19.3413 26.3937 18.8573 26.5 18.3 26.5H15.693ZM17.343 24.96H18.3C18.6373 24.96 18.9087 24.8647 19.114 24.674C19.3193 24.4833 19.422 24.2303 19.422 23.915V21.044C19.422 20.736 19.3193 20.4867 19.114 20.296C18.9087 20.1053 18.6373 20.01 18.3 20.01H17.343V24.96ZM22.4757 26.5V25.07H24.4997V19.977L22.4537 21.495V19.79L24.3347 18.47H26.1497V25.07H27.7557V26.5H22.4757Z" fill="#6FFFB0" />
                    <Rect x="5" y="38" width="35" height="45" rx="4" fill="#6FFFB0" />
                    <Rect x="5.5" y="99.5" width="34" height="24" rx="3.5" fill="#050507" />
                    <Rect x="5.5" y="99.5" width="34" height="24" rx="3.5" stroke="#F1F1F1" />
                    <Path d="M16.067 115.5V107.47H18.058C18.5713 107.47 19.015 107.569 19.389 107.767C19.7703 107.965 20.0637 108.247 20.269 108.614C20.4743 108.973 20.577 109.395 20.577 109.879V113.08C20.577 113.571 20.4743 114 20.269 114.367C20.0637 114.726 19.7703 115.005 19.389 115.203C19.015 115.401 18.5713 115.5 18.058 115.5H16.067ZM16.936 114.719H18.058C18.5713 114.719 18.9747 114.572 19.268 114.279C19.5613 113.986 19.708 113.586 19.708 113.08V109.879C19.708 109.38 19.5577 108.984 19.257 108.691C18.9637 108.398 18.564 108.251 18.058 108.251H16.936V114.719ZM22.5307 115.5L22.9817 113.135H21.9807V112.486H23.0917L23.4657 110.484H22.3657V109.835H23.5867L24.0267 107.47H24.7197L24.2797 109.835H26.1167L26.5567 107.47H27.2607L26.8097 109.835H27.8107V110.484H26.6997L26.3257 112.486H27.4257V113.135H26.2047L25.7647 115.5H25.0717L25.5117 113.135H23.6747L23.2347 115.5H22.5307ZM23.7847 112.486H25.6217L26.0067 110.484H24.1697L23.7847 112.486Z" fill="#F1F1F1" />
                    <Rect x="5" y="127" width="35" height="45" rx="4" fill="#1D1E22" />
                    <Rect x="5.5" y="188.5" width="34" height="24" rx="3.5" fill="#050507" />
                    <Rect x="5.5" y="188.5" width="34" height="24" rx="3.5" stroke="#F1F1F1" />
                    <Path d="M16.067 204.5V196.47H18.058C18.5713 196.47 19.015 196.569 19.389 196.767C19.7703 196.965 20.0637 197.247 20.269 197.614C20.4743 197.973 20.577 198.395 20.577 198.879V202.08C20.577 202.571 20.4743 203 20.269 203.367C20.0637 203.726 19.7703 204.005 19.389 204.203C19.015 204.401 18.5713 204.5 18.058 204.5H16.067ZM16.936 203.719H18.058C18.5713 203.719 18.9747 203.572 19.268 203.279C19.5613 202.986 19.708 202.586 19.708 202.08V198.879C19.708 198.38 19.5577 197.984 19.257 197.691C18.9637 197.398 18.564 197.251 18.058 197.251H16.936V203.719ZM22.5307 204.5L22.9817 202.135H21.9807V201.486H23.0917L23.4657 199.484H22.3657V198.835H23.5867L24.0267 196.47H24.7197L24.2797 198.835H26.1167L26.5567 196.47H27.2607L26.8097 198.835H27.8107V199.484H26.6997L26.3257 201.486H27.4257V202.135H26.2047L25.7647 204.5H25.0717L25.5117 202.135H23.6747L23.2347 204.5H22.5307ZM23.7847 201.486H25.6217L26.0067 199.484H24.1697L23.7847 201.486Z" fill="#F1F1F1" />
                    <Rect x="5" y="216" width="35" height="45" rx="4" fill="#1D1E22" />
                </Svg>

            </View>
        }

        <View
            style={{
                width: "100%",
                // height: 100%
            }}
            {...rest}
        >



            <View
                style={[Style.back, {
                    transform: [{ translateY: -(backButtonHeight || 0) - 5 }],
                    opacity: isFolderVisible ? 1 : history[history.length - 1] === "" ? 0 : 1
                }]}
                onLayout={(e) => {
                    if (!backButtonWidth) setBackButtonWidth(e.nativeEvent.layout.width as any);
                    if (!backButtonHeight) setBackButtonHeight(e.nativeEvent.layout.height as any);
                }}
            >

                <Button
                    type="back"
                    label={"< retour"}
                    style={{
                        height: 30
                    }}
                    onPress={() => {
                        if (history[history.length - 1] !== "") {
                            setSelectedView(history[history.length - 2])
                            setHistory((h) => {
                                return h.slice(0, -2)
                            })
                        }
                        else if (isFolderVisible) {
                            setFolderVisibility(false)
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
                        offset={90}
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