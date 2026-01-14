// hooks/useGestureDrag.ts
import { Dimensions, LayoutChangeEvent } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

let sizes = Dimensions.get("screen");

interface UseGestureDragProps {
    onPositionChanged?: (x: number, y: number) => void;
    onDragEnded?: (x: number, y: number) => void;
    initialX?: number;
    initialY?: number;
    resetOnDragFinalize?: boolean;
    enable?: boolean
}

export const useGestureDrag = ({
    onPositionChanged,
    onDragEnded,
    initialX = sizes.width / 2,
    initialY = sizes.height / 2,
    resetOnDragFinalize: resetOnDragEnded = false,
    enable = true
}: UseGestureDragProps = {}) => {
    const width = useSharedValue(0);
    const height = useSharedValue(0);
    const top = useSharedValue(initialY);
    const left = useSharedValue(initialX);
    const isDragging = useSharedValue(false);

    const onLayoutHandler = (e: LayoutChangeEvent) => {
        width.value = e.nativeEvent.layout.width;
        height.value = e.nativeEvent.layout.height;
    };

    const panGesture = Gesture.Pan()
        .onBegin((e) => {
            if (!enable) return;
            isDragging.value = true
            top.value = withSpring(e.absoluteY, { duration: 200 });
            left.value = withSpring(e.absoluteX, { duration: 200 });
            onPositionChanged?.(left.value, top.value);
        })
        .onUpdate((e) => {
            if (!enable) return;
            top.value = withSpring(e.absoluteY, { duration: 200 });
            left.value = withSpring(e.absoluteX, { duration: 200 });
            onPositionChanged?.(left.value, top.value);
        })
        .onFinalize(() => {
            if (!enable) return;
            isDragging.value = false
            onDragEnded?.(left.value, top.value);
            if (resetOnDragEnded) {
                top.value = withSpring(initialY, { duration: 400 });
                left.value = withSpring(initialX, { duration: 400 });
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            top: top.value - height.value / 2,
            left: left.value - width.value / 2,
        }
    });

    return {
        panGesture,
        animatedStyle,
        onLayoutHandler,
        position: { top, left },
        dimensions: { width, height },
        isDragging
    };
};