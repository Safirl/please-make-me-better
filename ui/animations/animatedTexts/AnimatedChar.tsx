import Animated, { useAnimatedStyle, useAnimatedRef, useSharedValue, withTiming, withDelay } from "react-native-reanimated";
import { useEffect } from "react";


type AnimatedCharProps = {
    char: string;
    index: number
    delay?: number
    currentLine: any
    prevCharY: any
    dumpedIndexes: any
    charSpeeed?: number
}

const TextAnimatedChar = (props: AnimatedCharProps) => {

    const {
        char,
        delay = 0,
        currentLine,
        prevCharY,
        dumpedIndexes,
        charSpeeed = 35
    } = props
    const opacity = useSharedValue(0)
    const ref = useAnimatedRef<Animated.Text>()
    let index = props.index



    const animate = () => {

        opacity.value = withDelay(
            (index - dumpedIndexes.value) * 5 + delay + currentLine.value * 100,                 // vitesse de frappe
            withTiming(1, { duration: 200 })
        )
    }




    useEffect(() => {
        if (!ref.current) return


        setTimeout(() => {



            // const layout = measure(ref)



            // if (!layout) {
            //     animate()
            //     return
            // }

            // if (prevCharY === -1) {
            //     prevCharY.value = layout.y
            //     currentLine.value = 0


            //     animate()
            //     return
            // }

            // if (prevCharY.value !== layout.y) {
            //     currentLine.value = currentLine.value + 1
            //     prevCharY.value = layout.y
            //     dumpedIndexes.value += index

            // }

            animate()
        }, 0)
    }, [ref])


    const animatedText = useAnimatedStyle(() => {
        return {
            opacity: opacity.value
        }
    });


    return (<Animated.Text
        ref={ref}
        style={[{ maxWidth: 14 }, animatedText]}
    >{char}</Animated.Text>)
}

export default TextAnimatedChar