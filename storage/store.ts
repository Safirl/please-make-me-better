import { characters, ComposedTrait, Emotion, Memory, Trait } from '@/data/characters'
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
  traits: Trait[]
  composedTraits: ComposedTrait[]
  //set the trait that are going to be merged
  selectedTraits: {0: Trait | null, 1: Trait | null}
  currentTraitPosition: {x:number, y:number}
  createdComposedTraits: ComposedTrait[]
  containerCenterX: number
  containerCenterY: number
  isContainerReady: boolean
  closestTraitId: number
  currentScene: number

  setContainerPosition: (x: number, y: number) => void
  addSelectedTrait: (trait: Trait) => void
  selectTrait: (trait0: Trait, trait1: Trait) => void
  setCurrentTraitPosition: (x: number, y: number) => void
  resetTraits: () => void;
  setClosestTraitId: (id: number) => void;
  setCurrentScene: (id: number) => void;
  createComposedTrait: (trait: ComposedTrait) => void;
}

export const usePersonalityStorage = create<PersonalityState>((set) => ({
  traits: characters[0].traits,
  currentTraitPosition: {x:0, y:0},
  createdComposedTraits: [],
  selectedTraits: {0:null,1:null},
  containerCenterX: 0,
  containerCenterY: 0,
  isContainerReady: false,
  closestTraitId: -1,
  currentScene: 0,
  composedTraits: characters[0].composedTraits,

  setContainerPosition: (x, y) => set((state) => ({containerCenterX: x, containerCenterY: y, isContainerReady: true})),
  addSelectedTrait: (trait) => set((state) => {
    if (state.selectedTraits[0] === null) {
      return {
        selectedTraits: {...state.selectedTraits, 0: trait}
      };
    } else if (state.selectedTraits[1] === null) {
      return {
        selectedTraits: {...state.selectedTraits, 1: trait}
      };
    }
    // Si les deux sont pleins, ne rien faire
    return state;
  }),
  selectTrait: (trait0, trait1) => set((state) => ({traits: state.traits.filter((t: Trait) => t === trait0 || t === trait1)})),
  setCurrentTraitPosition: (x,y) => set(() =>({currentTraitPosition: {x,y}})),
  resetTraits: () => set(() => ({selectedTraits: {0:null,1:null}})),
  setClosestTraitId: (id) => set(() => ({closestTraitId: id})),
  setCurrentScene: (id) => set(() => ({currentScene: id})),
  createComposedTrait: (trait) => set((state) => ({createdComposedTraits: [...state.createdComposedTraits, trait]}))
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
