// import GL from "@/ui/GL";
import GPU from "@/ui/GPU";
import {Stack} from "expo-router";
import {View} from "react-native";
import {useFonts} from "expo-font";

export default function RootLayout() {
    const [loaded, error] = useFonts({
        JetBrainsMono: require("../assets/fonts/JetBrainsMono/JetBrainsMono[wght].ttf"),
    });

    return <>

        <View
            style={{
                position: "fixed",
                zIndex: 10,
                width: "100%",
                height: "100%",
            }}
        >
            <GPU/>
        </View>
        <Stack/>
    </>;
}
