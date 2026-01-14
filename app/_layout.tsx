import GL from "@/ui/GL";
import { primaryBackgroundTokens } from "@/tokens/primary/backgrounds.tokens";
import Button from "@/ui/Button";
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
            <GL />
        </View>
        <Stack screenOptions={{
            contentStyle: { backgroundColor: 'transparent' },
            headerStyle: { backgroundColor: 'transparent' },
            headerTransparent: true,
            headerShown: false,
            // debug: false
        }}>
            <Stack.Screen name="index" options={{ title: 'Configurator', headerShown: false, }} />
            <Stack.Screen name="(pages)/memoriesPage" options={{ title: '', headerStyle: styles.headerStyle }} />
            <Stack.Screen name="(pages)/v2personalityPage" options={{ title: '', headerStyle: styles.headerStyle }} />
            <Stack.Screen name="(pages)/emotionsPage" options={{ title: '', headerStyle: styles.headerStyle }} />
        </Stack>
        <View style={styles.validateButton}>
            <Button type="primary" icon={{name: "file"}} overridePadding={12}></Button>
        </View>
    </>;
}


const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
    },

    validateButton: {
        display:"flex",
        alignItems: "center",
        position:"absolute",
        bottom: 0,
        right: 0,
        padding: 24
    }
}) 