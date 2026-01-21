import { ComposedTrait, Emotion, Memory } from "@/assets/data/characters";
import { characters } from "@/assets/data/characters";

interface UsePathCalculatorProps {
    selectedMemories: Memory[],
    composedTrait: ComposedTrait[],
    emotions: Emotion[]
}

export const useChoicesCalculator = ({
    selectedMemories,
    composedTrait,
    emotions
}: UsePathCalculatorProps) => {
    const initialMemories = characters[0].memories

    const getMemoryChoices = () => {
        let memoryChoices: number[] = [];
        let erasedMemories = initialMemories.filter(memory => !selectedMemories.includes(memory))
        erasedMemories.forEach(erased => {
            memoryChoices.push(erased.pathErased)
        });
        selectedMemories.forEach(memory => {
            memoryChoices.push(memory.path)
        })
        return memoryChoices;
    }

    const getPersonalityChoices = () => {
        let personalityChoices: number[] = [];
        composedTrait.forEach(trait => {
            personalityChoices.push(trait.path)
        });
        console.log("personality: ", personalityChoices)
        return personalityChoices;
    }

    const getEmotionChoices = () => {
        let emotionChoices: number[] = [];
        emotions.forEach(emotion => {            
            if (emotion.slug === "colere") {
                emotionChoices.push(
                    emotion.intensity > .5 ? 2 : 0
                )
            }
            else if (emotion.slug === "joie") {
                emotionChoices.push(
                    emotion.intensity > .5 ? 0 : 2
                )
            }
            else if (emotion.slug === "tristesse") {
                emotionChoices.push(
                    emotion.intensity > .5 ? 2 : 1
                )
            }
            else if (emotion.slug === "serenite") {
                emotionChoices.push(
                    emotion.intensity > .5 ? 0 : 1
                )
            }
        });
        return emotionChoices;
    }

    const getFinalChoices = () => {
        let finalChoices: number[] = []
        finalChoices = finalChoices.concat(getEmotionChoices(), getMemoryChoices(), getPersonalityChoices())
        console.log("finalChoices: ", finalChoices)
        return finalChoices
    }

    return {
        getMemoryChoices,
        getPersonalityChoices,
        getEmotionChoices,
        getFinalChoices
    }
}