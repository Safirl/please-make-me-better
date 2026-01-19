import { router } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { useStorage } from "../../assets/scripts/storage/store";
import Button from "@/ui/Button";
import Helpers from "../utils/Helpers";
import Svg, { Circle } from "react-native-svg";
import { StyleSheet } from "react-native";
import { Href } from "expo-router";

const dimensions = Dimensions.get("window")

export default function configuratorPage() {
  const currentParameter: string = useStorage((state: any) => state.currentParameter)
  const setCurrentParameter = useStorage((state: any) => state.setCurrentParameter)

  useEffect(() => {
    if (!Helpers.isDevMode) return;
    let root = Helpers.instance.getGUIFolder();
    let folder = root.addFolder("Parameter");
    // Helpers.instance.tweak()
  }, [])

  const buttons = [
    { label: "Memories", icon: "memory" as const, route: "/memoriesPage" as Href, style: styles.button1 },
    { label: "Emotions", icon: "emotion" as const, route: "/emotionsPage" as Href, style: styles.button2 },
    { label: "Personality", icon: "personality" as const, route: "/personalityPage" as Href, style: styles.button3 },
  ];

  const handleNavigate = (route: Href) => {
    router.navigate(route)
  }

  return (
    <View
      style={styles.container}
    >
      {
        buttons.map(({ label, icon, route, style }) => (
          <View key={label} style={style}>
            <Button
              type="tertiary"
              label={label}
              icon={{ name: icon }}
              onPress={() => handleNavigate(route)}
            />
          </View>
        ))
      }


      <Svg
        style={styles.circle}
        width={490}
        height={394}
        fill="none"
      >
        <Circle
          cx={245}
          cy={197}
          r={(dimensions.width / 2) * .7}
          stroke="#969696"
          strokeDasharray="11 11"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },

  circle: {
    position: "absolute",
    zIndex: -1
  },

  button1: {
    position: "absolute",
    left: "10%",
    top: 20
  },

  button2: {
    position: "absolute",
    left: "10%",
    top: 300
  },

  button3: {
    position: "absolute",
    right: "10%",
  }
})