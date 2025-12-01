import { create } from 'zustand'

//@TODO We should split in multiple storage according to the complexity of the project
export const useStorage = create((set) => ({
  currentParameter: "",
  isModalOpened: false,

  resetCurrentParameter: () => set({ currentParameter: "", isModalOpened: false }),
  setCurrentParameter: (newParameter: string) => set({ currentParameter: newParameter, isModalOpened: true }),
}))

export const useGameStorage = create((set) => ({
  previousStep: "none",
  currentStep: "intro",
  companySatisfaction: 0, //between 0 and 1
  characterSanity: 1,
  playerState: [],
  characterStates: [],
  currentDay: 0,
}))

export const useDayStorage = create((set) => ({
  dailyOrder: [],
  currentOrder: 0,
  currentEmotions: [
    {joy: 0},
    {confidence: 0},
    {fear: 1.},
    {surprise: .2},
    {sadness: .2},
    {disgust: .2},
    {anger: .2},
    {vigilance: .2},
  ],
}))
//Current Order
//Current Day
