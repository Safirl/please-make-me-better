import { CursorParameter } from "@/ui/Parameters/cursorParameter";
import { WordParameter } from "@/ui/Parameters/wordParameter";
import { Text } from "@react-navigation/elements";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { useStorage } from "../storage/store";
import Button from "@/ui/Button";
import Helpers from "./utils/Helpers";
import Svg, { Circle } from "react-native-svg";
import { StyleSheet } from "react-native";
import { Href } from "expo-router";
import { Animated, Easing } from "react-native";
const dimensions = Dimensions.get("window")

export default function Index() {
  const currentParameter: string = useStorage((state: any) => state.currentParameter)
  const setCurrentParameter = useStorage((state: any) => state.setCurrentParameter)


  useEffect(() => {
    if (!Helpers.isDevMode) return;
    let root = Helpers.instance.getGUIFolder();
    let folder = root.addFolder("Parameter");
    // Helpers.instance.tweak()
  }, [])

  const [buttons, setButtons] = useState([
    {
      label: "Memories",
      icon: "memory" as const,
      route: "/memoriesPage" as Href,
      style: styles.button1,
      tx: new Animated.Value(0),
      animation: {
        finalePosition: -350,
        velocity: 1.15
      }

    },
    {
      label: "Emotions",
      icon: "emotion" as const,
      route: "/memoriesPage" as Href,
      style: styles.button2,
      tx: new Animated.Value(0),
      animation: {
        finalePosition: -350,
        velocity: 1.3
      }

    },
    {
      label: "Personality",
      icon: "personality" as const,
      route: "/memoriesPage" as Href,
      style: styles.button3,
      tx: new Animated.Value(0),
      animation: {
        finalePosition: -650,
        velocity: 1.8
      }

    },
  ]);

  const handleNavigate = (route: Href) => {
    const animationDurationInMs = 660

    buttons.map((button, i) => {
      Animated.timing(button.tx, {
        toValue: button.animation.finalePosition, /* We can replace the velocity factor by the distance to get out the screen. */
        duration: animationDurationInMs,
        delay: i * 60,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.cubic),
      }).start()
    })

    setTimeout(() => {

      router.navigate(route)

    }, animationDurationInMs)
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}
    >


      {
        buttons.map(({ label, icon, route, style, tx }) => (
          <Animated.View
            key={label}
            style={[
              style,
              {
                transform: [{ translateX: tx }],
              }
            ]
            }


          >
            <Button
              type="tertiary"
              label={label}
              icon={{ name: icon }}
              onPress={() => handleNavigate(route)}
            />
          </Animated.View>
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
  circle: {
    position: "absolute",
    zIndex: -1
  },

  button1: {
    position: "absolute",
    left: "10%",
    top: 20
  } as any,

  button2: {
    position: "absolute",
    left: "10%",
    top: 300
  } as any,

  button3: {
    position: "absolute",
    right: "10%",
  } as any
})