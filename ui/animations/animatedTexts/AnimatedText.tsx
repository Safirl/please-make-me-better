import { Text, TextProps } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import TextAnimatedChar from "./AnimatedChar"
interface AnimatedLineProps extends TextProps {
    text: string
    delay?: number
    charSpeed?: number
}
const TextAnimatedLine = (props: AnimatedLineProps) => {
    const {
        text,
        delay = 0,
        charSpeed = 35,
        ...rest
    } = props

    const currentLine = useSharedValue(0)
    const prevCharY = useSharedValue(-1)
    const dumpedIndexes = useSharedValue(0)

    return <Text
        {...rest}
    >

        {
            text
                .split("")
                .map((char, i) => {
                    return<TextAnimatedChar
                        key={i}
                        char={char}
                        index={i}
                        delay={delay}
                        currentLine={currentLine}
                        prevCharY={prevCharY}
                        dumpedIndexes={dumpedIndexes}
                        charSpeeed={charSpeed}
                    />
                })
        }
    </Text>

}
export default TextAnimatedLine