import { useProgressStorage, ProgressStateType } from "@/assets/scripts/storage/useGameProgressStorage";
import { useRef } from "react";

export const useStoryProgress = (gameProgress: ProgressStateType) => {

    const gp = useRef(gameProgress)



    const moveNextStep = () => {
        gameProgress.nextStep()
    }
    const movePrevStep = () => {
        gameProgress.prevStep()
    }





    return {
        moveNextStep,
        movePrevStep,
    }
}