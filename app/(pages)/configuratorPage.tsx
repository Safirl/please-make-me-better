import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { Dimensions, Pressable, View } from "react-native";
import Button from "@/ui/Button";
import Helpers from "../utils/Helpers";
import Svg, { Circle } from "react-native-svg";
import { StyleSheet } from "react-native";
import { Href } from "expo-router";
import { useParametersDisplayStateStorage } from "@/assets/scripts/storage/useParametersProgressStorage";
import { useProgressStorage } from "@/assets/scripts/storage/useGameProgressStorage";
import { useRoute } from "@react-navigation/native";
import { Easing } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withDelay } from "react-native-reanimated";
const DIMENSIONS = Dimensions.get("window")

export default function configuratorPage() {
  const setCurrentParameter = useParametersDisplayStateStorage((state) => state.setCurrentParameter)
  const setCurrentStepFromPath = useProgressStorage((state) => state.setCurrentStepFromPath)
  const currentStep = useProgressStorage((state) => state.currentStep)
  const route = useRoute()

  const scaleCircle = useSharedValue(1)
  const opacityCircle = useSharedValue(1)


  const scalebtn1 = useSharedValue(1)
  const scalebtn2 = useSharedValue(1)
  const scalebtn3 = useSharedValue(1)

  const translateXbtn1 = useSharedValue(0)
  const translateXbtn2 = useSharedValue(0)
  const translateXbtn3 = useSharedValue(0)

  const translateYbtn1 = useSharedValue(0)
  const translateYbtn2 = useSharedValue(0)
  const translateYbtn3 = useSharedValue(0)

  useEffect(() => {
    setCurrentParameter("")
    if (!Helpers.isDevMode) return;
    let root = Helpers.instance.getGUIFolder();
    let folder = root.addFolder("Parameter");
    // Helpers.instance.tweak()
  }, [])

  useFocusEffect(
    useCallback(() => {
      setCurrentParameter("")
    }, [])
  );

  useEffect(() => {
    const trueRoute = route.name.replace('(pages)', '')
    // console.log("route: ", trueRoute)
    if (!currentStep) {
      setCurrentStepFromPath(trueRoute)
    }
    // console.log("new current step: ", currentStep)
  }, [currentStep])

  const buttons = [
    { label: "Memories", icon: "memory" as const, route: "/memoriesPage" as Href, style: styles.button1 },
    { label: "Emotions", icon: "emotion" as const, route: "/emotionsPage" as Href, style: styles.button2 },
    { label: "Personality", icon: "personality" as const, route: "/personalityPage" as Href, style: styles.button3 },
  ];

  const handleNavigate = (route: Href) => {

    const duration = 800
    const easeOut = Easing.in(Easing.exp)

    let btn1delay = 0
    let btn2delay = 20
    let btn3delay = 40

    if (route === "/emotionsPage") {

      btn1delay = 20
      btn2delay = 0
      btn3delay = 40

    }
    if (route === "/personalityPage") {

      btn1delay = 40
      btn2delay = 20
      btn3delay = 0

    }






    scaleCircle.value = withDelay(
      0,
      withTiming(1.2, { duration: duration, easing: easeOut })
    )
    opacityCircle.value = withDelay(
      0,
      withTiming(0, { duration: duration, easing: easeOut })
    )


    scalebtn1.value = withDelay(
      btn1delay,
      withTiming(1.5, { duration: duration, easing: easeOut })
    )
    scalebtn2.value = withDelay(
      btn2delay,
      withTiming(1.5, { duration: duration, easing: easeOut })
    )
    scalebtn3.value = withDelay(
      btn3delay,
      withTiming(1.5, { duration: duration, easing: easeOut })
    )



    translateXbtn1.value = withDelay(
      btn1delay,
      withTiming(-100, { duration: duration, easing: easeOut })
    )
    translateXbtn2.value = withDelay(
      btn2delay,
      withTiming(-100, { duration: duration, easing: easeOut })
    )
    translateXbtn3.value = withDelay(
      btn3delay,
      withTiming(100, { duration: duration, easing: easeOut })
    )



    translateYbtn1.value = withDelay(
      btn1delay,
      withTiming(-100, { duration: duration, easing: easeOut })
    )
    translateYbtn2.value = withDelay(
      btn2delay,
      withTiming(100, { duration: duration, easing: easeOut })
    )
    translateYbtn3.value = withDelay(
      btn3delay,
      withTiming(250, { duration: duration, easing: easeOut })
    )

    setTimeout(() => {
      router.navigate(route)
    }, duration)
  }

  const btn1Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateXbtn1.value },
        { translateY: translateYbtn1.value },
        { scale: scalebtn1.value },
      ]
    }
  });

  const btn2Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateXbtn2.value },
        { translateY: translateYbtn2.value },
        { scale: scalebtn2.value },
      ]
    }
  });

  const btn3Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateXbtn3.value },
        { translateY: translateYbtn3.value },
        { scale: scalebtn3.value },
      ]
    }
  });

  const circleAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaleCircle.value }
      ],
      opacity: opacityCircle.value
    }
  })
  return (
    <View
      style={styles.container}
    >
      {
        buttons.map(({ label, icon, route, style }, i) => (
          <Animated.View key={label} style={[
            style, [
              btn1Style,
              btn2Style,
              btn3Style
            ][i]
          ]}>
            <Button
              type="tertiary"
              label={label}
              icon={{ name: icon }}
              onPress={() => handleNavigate(route)}
            />
          </Animated.View>
        ))
      }

      <Animated.View style={[styles.circle, circleAnimationStyle]}>
        <Svg
          width={500}
          height={500}
          fill="none"
        >
          <Circle
            cx={250}
            cy={250}
            r={250}
            stroke="#969696"
            strokeDasharray="11 11"
          />
        </Svg>
      </Animated.View>
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