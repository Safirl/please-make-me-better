import GL from "@/ui/GL";
import Button from "@/ui/Button";
import { primaryBackgroundTokens } from "@/assets/tokens/primary/backgrounds.tokens";
import { useTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useParametersProgressStorage } from "@/assets/scripts/storage/useParametersProgressStorage";
import { useEffect } from "react";
import FolderPage from "./(pages)/foldersPage";


export default function RootLayout() {
    const currentParameter = useParametersProgressStorage((state) => state.currentParameter)
    const hasParameterBeenModified = useParametersProgressStorage((state) => state.hasParameterBeenModified)
    const isFolderVisible = useParametersProgressStorage((state) => state.isFolderVisible)
    const setFolderVisibility = useParametersProgressStorage((state) => state.setFolderVisibility)
    
    const [loaded, error] = useFonts({
        JetBrainsMono: require("../assets/fonts/JetBrainsMono/JetBrainsMono[wght].ttf"),
    });

    const { colors } = useTheme();
    colors.background = 'transparent';

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
        <View style={styles.validateButton}>
            <Button type="primary" icon={{name: "file"}} overridePadding={12} onPress={hasParameterBeenModified ? ()=>setFolderVisibility(true) : ()=>{}}></Button>
            {
                currentParameter === "" &&
                <Button type={hasParameterBeenModified ? "primary" : "secondary"} label="Finaliser" overridePadding={24}></Button>
            }
        </View>

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