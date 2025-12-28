import { characters, Memory, Trait } from '@/data/characters'
import { Vec3, Vector } from '@shopify/react-native-skia'
import { create } from 'zustand'

//@TODO We should split in multiple storage according to the complexity of the project
export const useStorage = create((set) => ({
  currentParameter: "",
  isModalOpened: false,

  resetCurrentParameter: () => set({ currentParameter: "", isModalOpened: false }),
  setCurrentParameter: (newParameter: string) => set({ currentParameter: newParameter, isModalOpened: true }),
}))

export interface Word {
  text: string,
  isSelected?: boolean
}

export const useSoulStorage = create((set) => ({
  fluidity: 0,
  blur: 0,
  grain: 0,

  setFluidity: (newValue: number) => set({ fluidity: newValue }),
  setGrain: (newValue: number) => set({ grain: newValue }),
  setBlur: (newValue: number) => set({ blur: newValue }),
}))

interface MemoryState {
  memories: Memory[]
  gunPosition: {x: number, y: number}
  setGunPosition: (newPosition: {x: number, y: number}) => void

  pushMemory: (newMemory: Memory) => void
  removeMemory: (oldMemory: Memory) => void
}

export const useMemoryStorage = create<MemoryState>((set) => ({
  memories: characters[0].memories,
  gunPosition: {x:0,y:0},
  setGunPosition: (newPosition) => set((state) => ({gunPosition: newPosition})),
  pushMemory: (newMemory: Memory) => set((state) => ({memories: [...state.memories, newMemory]})),
  removeMemory: (oldMemory: Memory) => set((state) => ({memories: state.memories.filter((i: Memory) => i !== oldMemory)}))
}))

interface PersonnalityState {
  traits: Trait[]
  createdTraits: Trait[]
  createTrait: (trait0: Trait, trait1: Trait) => void
}

export const usePersonnalityStorage = create<PersonnalityState>((set) => ({
  traits: characters[0].traits,
  createdTraits: [],
  createTrait: (trait0, trait1) => set((state) => ({traits: state.traits.filter((t: Trait) => t === trait0 || t === trait1)}))
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
