import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { clamp, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface cursorProps {
  rotation: string,
  offsetX?: number,
  offsetY?: number,
  value: number,
  onValueChanged: (newValue: number) => void
}

const sizes = {
  width: 42,
  height: 130
}

export const Cursor = (props: cursorProps) => {
  const position = useSharedValue(sizes.height - props.value * sizes.height)
  const viewHeight = useSharedValue(0);

  const handleOnLayout = (event: LayoutChangeEvent) => {
    viewHeight.set(event.nativeEvent.layout.height);
  }

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      position.set(withTiming(e.y, {
          duration: 200,
        }, 
        () => {props.onValueChanged(position.get()/sizes.height + 21)}
      ))   
    })
    .onUpdate((e) => {
        position.set(clamp(e.y, 0,viewHeight.get()));
        props.onValueChanged(1 - position.get()/sizes.height)
    })

  const transformStyle = StyleSheet.create({
    transform: {
      transform: [
        {rotate: props.rotation}, 
        {translateX: props.offsetX ? props.offsetX : 0},
        {translateY: props.offsetY ? props.offsetY : 0}
      ],
    }
  })

  const animatedCursorStyle = useAnimatedStyle(() => ({
    top: position.value - 21,
  }));

  const animatedFillStyle = useAnimatedStyle(() => ({
    height: sizes.height - position.value,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.fillBackground, transformStyle.transform]} onLayout={handleOnLayout}>
          <Animated.View style={[styles.fill,animatedFillStyle]} />
          <Animated.View style={[styles.cursor, animatedCursorStyle]}/>
      </View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  fillBackground: {
    position: "absolute",
    backgroundColor: "red",
    height: sizes.height,
    width: sizes.width,
  },
  
  fill: {
    bottom: 0,
    left: 0,
    position: "absolute",
    height: sizes.height,
    width: sizes.width,
    backgroundColor: "green",
  },

  cursor: {
    position: "absolute",
    width: sizes.width,
    height: 42,
    borderRadius: 200,
    borderWidth: 1,
    left: 0,
    borderColor: primaryColorTokens["color-white"],
    backgroundColor: "rgba(84, 84, 84, 0.15);",
  }
});