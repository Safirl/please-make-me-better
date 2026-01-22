import { RelativePathString, router } from 'expo-router'
import { create } from 'zustand'


export type ProgressStateType = {
    currentStep: Step | null,
    choices: number[]
    
    setStep: (newStep: StepType) => void
    setNextStep: () => void
    setPrevStep: () => void
    addChoice: (choice: number) => void
    setChoices: (choices: number[]) => void
    setCurrentStepFromPath: (routePath?: string) => void;
}

type StepType = "title" | "login" | "folders" | "configurator" | "end" | "loreIntroduction"
type Step = {
    step: StepType;
    path: string;
};

export const steps: Step[] = [
    {step: "title", path: "/titlePage"},
    {step: "login", path: "/loginPage"},
    {step: "loreIntroduction", path: "/LoreIntroductionPage" },
    {step: "folders", path: "/foldersPage" },
    {step: "configurator", path: "/configuratorPage" },
    {step: "end", path: "/endingPage" }
]

export const useProgressStorage = create<ProgressStateType>((set) => ({
    currentStep: null,
    choices: [],
    setStep: (newStep) => set((state) => {
        const foundStep = steps.find(step => step.step === newStep);
        if (foundStep){
            router.navigate(foundStep.path as RelativePathString)
            return {
                currentStep: foundStep
            }
        }
        return state;
    }),
    setNextStep: () => {
        set(state => {
            if (!state.currentStep) {
                return {
                    currentStep: steps[0]
                }
            }

            const index = steps.indexOf(state.currentStep)
            if (index < (steps.length - 1)) {
                router.navigate(steps[index + 1].path as RelativePathString)
                return {
                    currentStep: steps[index + 1]
                }
            }
            console.error("can't move to next step: last step has already been reached")
            return state
        })
    },
    setPrevStep: () => {
        set(state => {
            if (!state.currentStep) {
                console.error("can't move to prev step: first step has already been reached")
                return state;
            }

            const index = steps.indexOf(state.currentStep)
            if (index > 0) {
                router.navigate(steps[index - 1].path as RelativePathString)
                return {
                    currentStep: steps[index - 1]
                }
            }
            console.error("can't move to prev step: first step has already been reached")
            return state
        })
    },
    setCurrentStepFromPath: (routePath) => {
        set(state => {
            const loadedStep = steps.find(step => step.path === routePath) ?? steps[0]
            return {
                currentStep: loadedStep
            }
        })
    },
    addChoice: (choice) => set((state) => ({choices: [...state.choices, choice]})),
    setChoices: (choices) => set(() => ({choices: choices}))
}))