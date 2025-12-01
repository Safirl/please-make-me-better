import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { clamp, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface cursorProps {
  onValueChanged: (newValue: number) => void
}

export const Cursor = (props: cursorProps) => {
  //@TODO Watch reanimated
  const position = useSharedValue(0)
  const viewHeight = useSharedValue(0);

  const handleOnLayout = (event: LayoutChangeEvent) => {
    viewHeight.set(event.nativeEvent.layout.height);
  }

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      position.set(withTiming(e.y, {
        duration: 200
      }))
    })
    .onUpdate((e) => {
        position.set(clamp(e.y, 0,viewHeight.get()));
        props.onValueChanged(position.get())
    })

  const animatedCursorStyle = useAnimatedStyle(() => ({
    top: position.value,
  }));
  const animatedFillStyle = useAnimatedStyle(() => ({
    height: 200 - position.value,
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
    height: 200,
    width: 50,
  },
  
  fill: {
    bottom: 0,
    left: 0,
    position: "absolute",
    height: 100,
    width: 50,
    backgroundColor: "green",
  },

  cursor: {
    position: "absolute",
    width: 50,
    height: 5,
    left: 0,
    backgroundColor: "yellow"
  }
});