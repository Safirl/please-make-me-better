import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens";
import { LayoutChangeEvent, StyleSheet, View, Easing } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { clamp, useAnimatedStyle, useDerivedValue, withDelay, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { useEffect } from "react";
interface cursorProps {
  rotation: "vertical+" | "vertical-" | "horizontal+" | "horizontal-",
  offsetX?: number,
  offsetY?: number,
  value: number,
  emotionId: number,
  onValueChanged: (newValue: number, emotionId: number) => void
  delay: number
}


export const Cursor = (props: cursorProps) => {
  const sizes =
    props.rotation === "horizontal+" || props.rotation === "horizontal-" ?
      {
        width: 100,
        height: 42
      }
      :
      {
        width: 42,
        height: 100
      }

  const viewHeight = useSharedValue(0);
  const viewWidth = useSharedValue(0);
  const isHorizontal = props.rotation === "horizontal+" || props.rotation === "horizontal-"
  const isPositive = props.rotation === "horizontal+" || props.rotation === "vertical+"


  const txt1 = useSharedValue(0)

  const initialPosition = (() => {
    if (isHorizontal) {
      if (!isPositive) {
        return sizes.width - props.value * sizes.width
      }
      return props.value * sizes.width
    }

    if (isPositive) {
      return sizes.height - props.value * sizes.height
    }
    return props.value * sizes.height
  })();

  const position = useSharedValue(initialPosition)
  const backgroundSize = useDerivedValue(() => isHorizontal ? viewWidth.value : viewHeight.value)


  const handleOnLayout = (event: LayoutChangeEvent) => {
    viewHeight.set(event.nativeEvent.layout.height);
    viewWidth.set(event.nativeEvent.layout.width);
  }

  const text1StyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: txt1.value
    }
  })

  const easeOut = Easing.out(Easing.exp)

  useEffect(() => {

    txt1.value = withDelay(
      100 + props.delay,
      withTiming(1, { duration: 750, easing: easeOut })
    )

  }, [])

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      const axisPos = isHorizontal ? e.x : e.y
      position.set(withSpring(axisPos, {},
        () => {
          let newValue = 0;
          if (isHorizontal) {
            newValue = isPositive ? (position.value / backgroundSize.value) : 1 - (position.value / backgroundSize.value)
          }
          else {
            newValue = isPositive ? 1 - (position.value / backgroundSize.value) : (position.value / backgroundSize.value)
          }
          props.onValueChanged(newValue, props.emotionId)
        }
      ))
    })
    .onUpdate((e) => {
      const axisPos = isHorizontal ? e.x : e.y
      position.set(withSpring(clamp(axisPos, 0, backgroundSize.value), {},
        () => {
          let newValue = 0;
          if (isHorizontal) {
            newValue = isPositive ? (position.value / backgroundSize.value) : 1 - (position.value / backgroundSize.value)
          }
          else {
            newValue = isPositive ? 1 - (position.value / backgroundSize.value) : (position.value / backgroundSize.value)
          }
          props.onValueChanged(newValue, props.emotionId)
        }
      ));
    })

  const backgroundDynamicStyle = StyleSheet.create({
    dynamic: {
      transform: [
        { translateX: props.offsetX ?? 0 },
        { translateY: props.offsetY ?? 0 }
      ],
      height: sizes.height,
      width: sizes.width,
    }
  })


  const animatedCursorStyle = useAnimatedStyle(() => ({
    top: isHorizontal ? 0 : position.value - 21,
    left: isHorizontal ? position.value - 21 : 0,
  }));

  // const fillDynamicStyle = StyleSheet.create({
  //   dynamic: {
  //     bottom: 0,
  //     left: isHorizontal ? isPositive ? 0 : "100%" : 0,
  //   }
  // })
  // const animatedFillStyle = useAnimatedStyle(() => ({
  //   height: isHorizontal ? sizes.height : sizes.height - position.value,
  //   width: isHorizontal ? props.rotation === "horizontal-" ? sizes.width - position.value : sizes.width + position.value : sizes.width,
  // }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.fillBackground, backgroundDynamicStyle.dynamic,]} onLayout={handleOnLayout}>
        {/* <Animated.View style={[styles.fill,fillDynamicStyle.dynamic, animatedFillStyle]} /> */}
        <Animated.View style={[styles.cursor, animatedCursorStyle, text1StyleAnimation]} />
      </View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  fillBackground: {
    position: "absolute",
    // backgroundColor: "red",
  },

  fill: {
    position: "absolute",
    backgroundColor: "green",
  },

  cursor: {
    position: "absolute",
    height: 42,
    width: 42,
    borderRadius: 200,
    borderWidth: 1,
    left: 0,
    borderColor: primaryColorTokens["color-white"],
    backgroundColor: "rgba(84, 84, 84, 0.15);",
  }
});