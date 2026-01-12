import { Cursor } from "@/ui/Parameters/cursor"
import { StyleSheet, View } from "react-native"

const emotionsParameters = () => {
    return (
        <View style={styles.container}>
            <Cursor value={0} offsetY={90} rotation="vertical-" onValueChanged={(value: number)=>{}}></Cursor>
            <Cursor value={0} offsetX={90} rotation="horizontal+" onValueChanged={(value: number)=>{}}></Cursor>
            <Cursor value={0} offsetY={-90} rotation="vertical+" onValueChanged={(value: number)=>{}}></Cursor>
            <Cursor value={0} offsetX={-90} rotation="horizontal-" onValueChanged={(value: number)=>{}}></Cursor>
        </View>
    )
}

export default emotionsParameters

const styles = StyleSheet.create({
    container: {
        height: "100%",
        position: 'relative',
        alignItems: "center",
        justifyContent: "center"
    }
})