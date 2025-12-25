import fonts from "@/assets/styles/fonts";
import GunCursor from "@/ui/Parameters/gunCursor";
import Target from "@/ui/Parameters/target";
import { primaryBackgroundTokens } from "@/tokens/primary/backgrounds.tokens";
import { primaryColorTokens } from "@/tokens/primary/colors.tokens";
import { fontTokens } from "@/tokens/primary/font.tokens";
import { StyleSheet, View, Text } from "react-native";
import { useMemoryStorage } from "@/storage/store";

const MemoriesParameters = () => {
    const memories = useMemoryStorage((state) => state.memories)
    const shootMemory = useMemoryStorage((state) => state.removeMemory)

    const shoot = (posX:number,posY:number) => {
        memories.forEach((memory)=> {
            const distance = Math.sqrt(Math.pow((posX - memory.posX), 2) + Math.pow((posY - memory.posY), 2))
            if (distance < 75) {
                shootMemory(memory)
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>Souvenirs</Text>
                <Text style={[styles.text, styles.instructionText]}>Trier sa mémoire</Text>
            </View>
            <GunCursor onDragEnded={shoot}/>
            {memories.map((memory) => (
                <Target key={memory.id} x={memory.posX} y={memory.posY} type={memory.type} label={memory.label}/>
            ))}
            {/* <Target x={memories[0].posX} y={memories[0].posY} type={memories[0].type} label={memories[0].label}/> */}
            
        </View>
    )
}

export default MemoriesParameters;

const styles = StyleSheet.create({
    titleContainer: {
        display: "flex",
        alignItems: "center",
        paddingTop: 16,
    },

    text: {
        ...fonts.paragraph
    },

    instructionText: {
        marginTop: 4,
        padding: 4,
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: primaryColorTokens["color-white"],
        color: fontTokens.primary['font-color-tertiary'],
        borderRadius: 3,
    },

    container: {
        backgroundColor: primaryBackgroundTokens["background-secondary"],
        height: "100%",
        overflow: "hidden"
    }
})