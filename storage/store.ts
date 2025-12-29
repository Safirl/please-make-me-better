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
  placeHolders: {x:number, y:number}[]
  traits: Trait[]
  //set the trait that are going to be merged
  composedTraits: {0: Trait | null, 1: Trait | null}
  currentTraitPosition: {x:number, y:number}
  createdTraits: Trait[]
  setPlaceHolder: (index: number, x: number, y: number) => void
  addComposedTrait: (trait: Trait) => void
  createTrait: (trait0: Trait, trait1: Trait) => void
  setCurrentTraitPosition: (x: number, y: number) => void
}

export const usePersonnalityStorage = create<PersonnalityState>((set) => ({
  traits: characters[0].traits,
  currentTraitPosition: {x:0, y:0},
  createdTraits: [],
  composedTraits: {0:null,1:null},
  placeHolders: [],
  setPlaceHolder: (index, x, y) => set((state) => ({placeHolders: [...state.placeHolders, state.placeHolders[index] = {x,y}]})),
  addComposedTrait: (trait) => set((state) => {
    if (state.composedTraits[0] === null) {
      return {
        composedTraits: {...state.composedTraits, 0: trait}
      };
    } else if (state.composedTraits[1] === null) {
      return {
        composedTraits: {...state.composedTraits, 1: trait}
      };
    }
    // Si les deux sont pleins, ne rien faire
    return state;
  }),
  createTrait: (trait0, trait1) => set((state) => ({traits: state.traits.filter((t: Trait) => t === trait0 || t === trait1)})),
  setCurrentTraitPosition: (x,y) => set((state) =>({currentTraitPosition: {x,y}}))
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
