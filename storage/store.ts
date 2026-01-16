import { characters, Emotion, Memory, Trait } from '@/data/characters'
import { Label } from '@react-navigation/elements'
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

interface PersonalityState {
  placeHoldersPos: {x:number, y:number}[]
  traits: Trait[]
  //set the trait that are going to be merged
  composedTraits: {0: Trait | null, 1: Trait | null}
  currentTraitPosition: {x:number, y:number}
  createdTraits: Trait[]
  containerCenterX: number
  containerCenterY: number
  isContainerReady: boolean
  closestTraitId: number
  currentScene: number

  setContainerPosition: (x: number, y: number) => void
  setPlaceHolderPos: (index: number, x: number, y: number) => void
  addComposedTrait: (trait: Trait) => void
  createTrait: (trait0: Trait, trait1: Trait) => void
  setCurrentTraitPosition: (x: number, y: number) => void
  resetTraits: () => void;
  setClosestTraitId: (id: number) => void;
  setCurrentScene: (id: number) => void;
}

export const usePersonalityStorage = create<PersonalityState>((set) => ({
  traits: characters[0].traits,
  currentTraitPosition: {x:0, y:0},
  createdTraits: [],
  composedTraits: {0:null,1:null},
  placeHoldersPos: [],
  containerCenterX: 0,
  containerCenterY: 0,
  isContainerReady: false,
  closestTraitId: 0,
  currentScene: 0,

  setContainerPosition: (x, y) => set((state) => ({containerCenterX: x, containerCenterY: y, isContainerReady: true})),
  setPlaceHolderPos: (index, x, y) => set((state) => {
    const newPlaceHolders = [...state.placeHoldersPos];
    newPlaceHolders[index] = {x, y};
    return {placeHoldersPos: newPlaceHolders};
  }),
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
  setCurrentTraitPosition: (x,y) => set(() =>({currentTraitPosition: {x,y}})),
  resetTraits: () => set(() => ({composedTraits: {0:null,1:null}})),
  setClosestTraitId: (id) => set(() => ({closestTraitId: id})),
  setCurrentScene: (id) => set(() => ({currentScene: id})),
}))

interface EmotionState {
  emotions: Emotion[]
  setEmotionIntensity: (id: number, intensity: number) => void;
}

export const useEmotionStorage = create<EmotionState>((set) => ({
  emotions: characters[0].emotions,
  setEmotionIntensity: (id, intensity) => set((state) => ({emotions: state.emotions.map((e,i) => i === id ? {id: id, label: e.label, intensity: intensity} as Emotion : e)}))
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
