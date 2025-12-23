// import GL from "@/ui/GL";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from "react";
import { View } from "react-native";

export default function RootLayout() {
    console.log("coucou")

    const [loaded, error] = useFonts({
        JetBrainsMono: require("../assets/fonts/JetBrainsMono/JetBrainsMono[wght].ttf"),
    });

    useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

    return <>

        <View
            style={{
                position: "fixed",
                zIndex: 10,
                width: "100%",
                height: 500,
            }}
        >
            {/* <GPU/> */}
        </View>
        <Stack/>
    </>;
}
