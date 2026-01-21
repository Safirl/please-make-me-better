import { Text, TextInput, StyleSheet, View } from "react-native";
import { useProgressStorage, ProgressStateType } from "@/assets/scripts/storage/useGameProgressStorage";

import Folder from "@/ui/Folders/";
import { router } from "expo-router";

interface FolderPageProps {
    showConfigureButton?: boolean
}

const FolderPage = ({showConfigureButton = true}: FolderPageProps) => {
    const gameProgress: ProgressStateType = useProgressStorage()

    const client = {
        name: "MIA (2) //",
        request: "Juste un dernier ajustement",
        work: "Mannequin",
        age: "26 ans",
        profilePicture: require('../../assets/images/clients/mia_pp.jpg')
    }

    const configure = () => {
        gameProgress.nextStep("folders")
        gameProgress.currentRoute && router.navigate(gameProgress.currentRoute.path)
    }

    return <View
        style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }}>


        <View
            style={{
                width: 675,
                // height: "100%"
            }}>

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
                    ...showConfigureButton && ({configure})
                }
            />


        </View>
    </View>
}

export default FolderPage