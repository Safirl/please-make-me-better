import { Word } from "@/assets/scripts/storage/store"
import { StyleSheet, Text, View } from "react-native"

interface wordlLabelProps {
    word: Word
    onWordClicked: (word: Word) => void
}

export const WordLabel = (props: wordlLabelProps) => {
    const {word} = props
    return (
        <View style={styles.label} onTouchStart={() => {props.onWordClicked({text: word.text, isSelected: !word.isSelected})}}>
            <Text>{props.word.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        borderColor: "black",
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
    }
})