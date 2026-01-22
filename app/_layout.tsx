import GL from "@/ui/GL";
import Button from "@/ui/Button";
import { primaryBackgroundTokens } from "@/assets/tokens/primary/backgrounds.tokens";
import { useTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import { Easing, StyleSheet, View } from "react-native";
import { useParametersDisplayStateStorage } from "@/assets/scripts/storage/useParametersProgressStorage";
import { useEffect } from "react";
import FolderPage from "./(pages)/foldersPage";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { useChoicesCalculator } from "@/assets/scripts/hooks/usePathCalculator";
import { useProgressStorage } from "@/assets/scripts/storage/useGameProgressStorage";
import { useEmotionStorage, useMemoryStorage, usePersonalityStorage } from "@/assets/scripts/storage/useParametersStorage";


export default function RootLayout() {
    const currentParameter = useParametersDisplayStateStorage((state) => state.currentParameter)
    const hasParameterBeenModified = useParametersDisplayStateStorage((state) => state.hasParameterBeenModified)
    const isFolderVisible = useParametersDisplayStateStorage((state) => state.isFolderVisible)
    const setFolderVisibility = useParametersDisplayStateStorage((state) => state.setFolderVisibility)
    const opacity = useSharedValue(1)
    const setChoices = useProgressStorage((state) => state.setChoices)
    const selectedMemories = useMemoryStorage((state) => state.memories)
    const composedTrait = usePersonalityStorage((state) => state.createdComposedTraits)
    const emotions = useEmotionStorage((state) => state.emotions)
    const currentStep = useProgressStorage((state) => state.currentStep)
    const navigateToNextStep = useProgressStorage((state) => state.setNextStep)
    const setCurrentStepFromPath = useProgressStorage((state) => state.setCurrentStepFromPath)
    
    const [loaded, error] = useFonts({
        JetBrainsMono: require("../assets/fonts/JetBrainsMono/JetBrainsMono[wght].ttf"),
    });
    const pathname = usePathname()

    const { colors } = useTheme();
    colors.background = 'transparent';

    const {getFinalChoices} = useChoicesCalculator({selectedMemories, composedTrait, emotions})

    const showEnding = () => {
        setChoices(getFinalChoices())
        opacity.value = withTiming(0, {duration: 2000, easing: Easing.out(Easing.ease)}, () => {
            navigateToNextStep()
        })
    }

    useEffect(() => {
        if (!currentStep) {
            setCurrentStepFromPath(pathname)
        }
    },[pathname])

    return <>
        <View
            style={{
                position: "fixed",
                zIndex: -1,
                width: "100%",
                height: "100%",
                backgroundColor: primaryBackgroundTokens["background-secondary"]
            }}
        >
            {/* <GL /> */}
        </View>
        <View style={{ height: "100%", overflow: "hidden" }}>
            <Stack screenOptions={{
                contentStyle: { backgroundColor: 'transparent' },
                headerStyle: { backgroundColor: 'transparent' },
                headerTransparent: true,
                headerShown: false,
                // debug: false
            }}>
                <Stack.Screen name="index" options={{ title: 'Configurator', headerShown: false, }} />
                <Stack.Screen name="(pages)/memoriesPage" options={{ title: '', headerStyle: styles.headerStyle }} />
                <Stack.Screen name="(pages)/personalityPage" options={{ title: '', headerStyle: styles.headerStyle }} />
                <Stack.Screen name="(pages)/emotionsPage" options={{ title: '', headerStyle: styles.headerStyle }} />
                <Stack.Screen name="(pages)/endingPage" options={{ title: '', headerStyle: styles.headerStyle }} />
            </Stack>
        </View>
        {
            currentStep?.step === "configurator" &&
            <View style={styles.validateButton}>
                <Button type="primary" icon={{name: "file"}} overridePadding={12} onPress={()=>setFolderVisibility(true)}></Button>
                {
                    currentParameter === "" &&
                    <Button type={hasParameterBeenModified ? "primary" : "secondary"} label="Finaliser" overridePadding={24} onPress={hasParameterBeenModified ? () => showEnding() : () => {}}></Button>
                }
            </View>
        }

        {
            isFolderVisible &&
            <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.85)"}}>
                <FolderPage showConfigureButton={false}></FolderPage>
            </View>
        }
    </>;
}


const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
    },

    validateButton: {
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: 24,
        gap: 4
    },
}) 