import { useStorage } from "@/app/store";
import { useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export const WheelParameter = () => {
    const text = useStorage((state: any) => state.text)
    useEffect(() => {
    })
    const onChangeText = useStorage((state: any) => {
        return state.updateText
    })
    return (
        <>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
            </View>
            <Text>{text}</Text>
        </>
    )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});