import { create } from 'zustand'


type Step = "" | "title" | "login" | "folders" | "configurator" | "end"
export type ProgressStateType = {
    steps: Step[];
    currentStep: Step,
    setCurrentStep: (step: Step) => void
    nextStep: (cs?: Step) => void
    prevStep: (cs?: Step) => void
    currentRoute: Route
}
type Routes = {
    [key: string]: Route
}

type Route = {
    path: string
} | null;

const routes = {
    "": null,
    "title": { path: "/titlePage" },
    "login": { path: "/loginPage" },
    "folders": { path: "/folders" },
    "configurator": { path: "/configurator" },
    "end": { path: "/end" }
} as Routes

export const useProgressStorage = create<ProgressStateType>((set) => ({
    steps: ["", "title", "login", "folders", "configurator", "end"] as Step[],
    currentStep: "",
    currentRoute: null,
    initProgress: () => {
        set(state => {
            if (state.currentStep === state.steps[0]) {

                state.currentStep = state.steps[1]

                if (!routes[state.currentStep]) {
                    return state
                }


                state.currentRoute = routes[state.currentStep]
            }

            return state
        })
    },
    setCurrentStep: (step: Step) => {
        set(state => {
            state.currentStep = step

            if (!routes[state.currentStep]) {
                return state
            }

            state.currentRoute = routes[state.currentStep]

            return state
        })
    },
    nextStep: (cs?: Step) => {
        /**
         * Eventually change this logic to avoid 2 calls on the same step changing 
         * maybe in params send the name of the currentstep and changing state.current state by the params current step.
         */
        set(state => {
            const index = state.steps.indexOf(cs || state.currentStep)
            if (index < (state.steps.length - 1)) {
                state.currentStep = state.steps[index + 1]


                if (!routes[state.currentStep]) {
                    return state
                }


                state.currentRoute = routes[state.currentStep]
            }


            console.log(state)
            return state
        })
    },
    prevStep: (cs?: Step) => {
        set(state => {
            const index = state.steps.indexOf(cs || state.currentStep)
            if (index > 0) {
                state.currentStep = state.steps[index - 1]


                if (!routes[state.currentStep]) {
                    return state
                }


                state.currentRoute = routes[state.currentStep]
            }

            return state
        })
    }
}))