import { useWordParameterStorage, Word, WordParameterState } from "@/storage/store";
import { StyleSheet, View } from "react-native";
import { WordLabel } from "./components/wordLabel";

export const WordParameter = () => {
    const words: Word[] = useWordParameterStorage((state: WordParameterState) => state.words)

    const setWord = useWordParameterStorage((state: WordParameterState) => {
            return state.setWord
    })
    
    // const handleWordClicked = (text: string) => {
    //     let isWordSelected = selectedWords.find((word) => word.text === text)
    //     if (isWordSelected) {
    //         setSelectedWords(l => l.filter(item => item.text !== text));
    //         setUnselectedWords(prev => ([
    //             ...prev,
    //             {text}
    //         ]));
    //     }
    //     else {
    //         setUnselectedWords(l => l.filter(item => item !== text));
    //         setSelectedWords(prev => ([
    //             ...prev,
    //             text
    //         ]));
    //     }
    // }

    return (
        <View style={styles.container}>
            <View style={styles.unselectedContainer}>
                {
                    words.map((word) => (
                        !word.isSelected &&
                        <WordLabel word={word} onWordClicked={setWord}/>
                    ))
                }
            </View>
            <View style={styles.selectedContainer}>
                {
                    words.map((word) => (
                        word.isSelected &&
                        <WordLabel word={word} onWordClicked={setWord}/>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 32
    },
    unselectedContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8
    },
    selectedContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        backgroundColor: "gray",
        borderWidth: 2,
        borderColor: "black",
        padding: 16,
        borderRadius: 16,
        height: 128
    }
});