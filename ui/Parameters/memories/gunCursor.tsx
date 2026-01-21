import { primaryColorTokens } from "@/assets/tokens/primary/colors.tokens";
import { Dimensions, StyleSheet, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";
import { useMemoryStorage } from "@/assets/scripts/storage/useParametersStorage";
import { useGestureDrag } from "@/assets/scripts/hooks/baseGestureHandler";

interface GunCursorProps {
    onDragEnded: (posX: number, posY: number) => void;
}

let sizes = Dimensions.get("screen");

const GunCursor = ({ onDragEnded }: GunCursorProps) => {
    const setGunPosition = useMemoryStorage((state) => state.setGunPosition);

    const { panGesture, animatedStyle, onLayoutHandler, position } = useGestureDrag({
        onPositionChanged: (x, y) => {
            setGunPosition({ x, y });
        },
        onDragEnded: (x, y) => {
            onDragEnded(x, y);
        },
    });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.cursorContainer, animatedStyle]} onLayout={onLayoutHandler}>
                <View style={styles.lineLeft} />
                <View style={styles.lineRight} />
                <View style={styles.lineTop} />
                <View style={styles.lineBottom} />

                <View style={styles.cursor}>
                    <Svg width={50} height={50} fill="none">
                        <Circle cx={25} cy={25} r={24.5} stroke="#F1F1F1" />
                    </Svg>
                </View>
            </Animated.View>
        </GestureDetector>
    );
};

export default GunCursor;


const styles = StyleSheet.create({
    cursorContainer: {
        zIndex: 100,
        position: "absolute",
        padding: 8,
        borderColor: primaryColorTokens["color-white"],
        borderWidth: 1,
        borderRadius: 3,
    },

    cursor: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        height: "auto",
        padding: 24,
        borderRadius: 3,
        backgroundColor: primaryColorTokens["color-tertiary-low-transparent"],
    },

   lineRight: {
        position: "absolute",
        top: "50%",
        right: "100%",
        width: 800,
        height: 1,
        backgroundColor: primaryColorTokens["color-tertiary-lower"]
    },
    lineLeft: {
        position: "absolute",
        top: "50%",
        left: "100%",
        width: 800,
        height: 1,
        backgroundColor: primaryColorTokens["color-tertiary-lower"]
    },
    lineTop: {
        position: "absolute",
        left: "50%",
        bottom: "100%",
        width: 1,
        height: 800,
        backgroundColor: primaryColorTokens["color-tertiary-lower"]
    },
    lineBottom: {
        position: "absolute",
        left: "50%",
        top: "100%",
        width: 1,
        height: 800,
        backgroundColor: primaryColorTokens["color-tertiary-lower"]
    }
})