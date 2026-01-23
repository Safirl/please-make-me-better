import { Text, TextInput, StyleSheet, View, Easing } from "react-native";
import { useProgressStorage, ProgressStateType } from "@/assets/scripts/storage/useGameProgressStorage";

import Folder from "@/ui/Folders/";
import { RelativePathString, router } from "expo-router";
import { primaryBackgroundTokens } from "@/assets/tokens/primary/backgrounds.tokens";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

interface FolderPageProps {
    showConfigureButton?: boolean
}

const FolderPage = ({ showConfigureButton = true }: FolderPageProps) => {
    const gameProgress: ProgressStateType = useProgressStorage()

    const client = {
        name: "MIA (2) //",
        request: "Juste un dernier ajustement",
        work: "Mannequin",
        age: "26 ans",
        profilePicture: require('../../assets/images/clients/mia_pp.jpg')
    }

    const configure = () => {
        globalOpacity.value = withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        // backgroundOpacity.value = withDelay(0, withTiming(0, { duration: 0, easing: Easing.inOut(Easing.ease) }, () => {
        // }))

        setTimeout(() => {

            gameProgress.setNextStep()
        }, 1000)
    }


    useEffect(() => {
        globalOpacity.value = withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
    }, [])

    const globalOpacity = useSharedValue(0)
    const backgroundOpacity = useSharedValue(1)

    const globalOpacityAnimatedStyle = useAnimatedStyle(() => ({
        opacity: globalOpacity.value
    }))

    const backgroundOpacityAnimatedStyle = useAnimatedStyle(() => ({
        opacity: backgroundOpacity.value
    }))

    return <Animated.View
        style={[{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
        },
            backgroundOpacityAnimatedStyle,
        (showConfigureButton && { backgroundColor: primaryBackgroundTokens["background-secondary"] })
        ]}>


        <Animated.View
            style={[
                {
                    width: 675,
                    // height: "100%"
                },
                globalOpacityAnimatedStyle
            ]}>

            <Folder
                type=''
                tabs={["Dossier"]}
                selectColor={"secondary"}
                client={client}
                gridContent={[
                    {
                        name: "Emotions",
                        labels: [{
                            label: "Lorem Ipsum",
                            status: "locked"
                        },
                        {
                            label: "Lorem Ipsum",
                            status: "neutral"
                        },
                        {
                            label: "Lorem Ipsum",
                            status: "neutral"
                        }]
                    },
                    {
                        name: "Emotions",
                        labels: [{
                            label: "Lorem Ipsum",
                            status: "locked"
                        },
                        {
                            label: "Lorem Ipsum",
                            status: "neutral"
                        },
                        {
                            label: "Lorem Ipsum",
                            status: "neutral"
                        }]
                    },
                    {
                        name: "Emotions",
                        labels: [{
                            label: "Lorem Ipsum",
                            status: "locked"
                        },
                        {
                            label: "Lorem Ipsum",
                            status: "neutral"
                        },
                        {
                            label: "Lorem Ipsum",
                            status: "neutral"
                        }]
                    },
                ]}
                currentView=''

                {
                ...showConfigureButton && ({ configure })
                }
            />


        </Animated.View>
    </Animated.View>
}

export default FolderPage