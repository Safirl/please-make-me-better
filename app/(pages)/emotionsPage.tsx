import { Cursor } from "@/ui/Parameters/cursor"
import { StyleSheet, View } from "react-native"

const emotionsParameters = () => {
    return (
        <View style={styles.container}>
            <Cursor offsetY={-90} rotation="0deg" onValueChanged={(value: number)=>{}}></Cursor>
            <Cursor offsetY={-90} rotation="90deg" onValueChanged={(value: number)=>{}}></Cursor>
            <Cursor offsetY={90} rotation="0deg" onValueChanged={(value: number)=>{}}></Cursor>
            <Cursor offsetY={-90} rotation="-90deg" onValueChanged={(value: number)=>{}}></Cursor>
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