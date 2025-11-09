import { create } from 'zustand'

export const useStorage = create((set) => ({
  text: "blablabla",
  resetText: () => set({ text: "" }),
  updateText: (newText: string) => set({ text: newText }),
}))