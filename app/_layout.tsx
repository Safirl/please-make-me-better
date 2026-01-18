// import GL from "@/ui/GL";
import { primaryBackgroundTokens } from "@/tokens/primary/backgrounds.tokens";
import GPU from "@/ui/GPU";
import { useTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
export default function RootLayout() {
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
            <GPU />
        </View>
        <Stack screenOptions={{
            contentStyle: { backgroundColor: 'transparent' },
            headerStyle: { backgroundColor: 'transparent' },
            headerTransparent: true
        }}>
            <Stack.Screen name="index" options={{ title: 'Configurator', headerShown: false, }} />
            <Stack.Screen name="(pages)/memoriesPage" options={{ title: '', headerStyle: styles.headerStyle }} />
            <Stack.Screen name="(pages)/personalityPage" options={{ title: '', headerStyle: styles.headerStyle }} />
            <Stack.Screen name="(pages)/emotionsPage" options={{ title: '', headerStyle: styles.headerStyle }} />
        </Stack>
    </>;
}


const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
    },
}) 