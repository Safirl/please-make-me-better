import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { clamp, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface cursorProps {
  value: number,
  onValueChanged: (newValue: number) => void
}

const sizes = {
  width: 50,
  height: 200
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
        () => {props.onValueChanged(position.get()/sizes.height)}
      ))   
    })
    .onUpdate((e) => {
        position.set(clamp(e.y, 0,viewHeight.get()));
        props.onValueChanged(1 - position.get()/sizes.height)
    })

  const animatedCursorStyle = useAnimatedStyle(() => ({
    top: position.value,
  }));
  const animatedFillStyle = useAnimatedStyle(() => ({
    height: sizes.height - position.value,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.fillBackground} onLayout={handleOnLayout}>
          <Animated.View style={[styles.fill,animatedFillStyle]} />
          <Animated.View style={[styles.cursor, animatedCursorStyle]}/>
      </View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  fillBackground: {
    position: "relative",
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
    height: 5,
    left: 0,
    backgroundColor: "yellow"
  }
});