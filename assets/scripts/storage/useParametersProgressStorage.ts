import { create } from "zustand";

interface useParametersProgressStorage {
    currentParameter: "" | "personality" | "memories" | "emotions";
    hasParameterBeenModified: boolean;

    setCurrentParameter: (newValue: "" | "personality" | "memories" | "emotions") => void;
    setHasParameterBeenModified: (newValue: boolean) => void;
}

export const useParametersProgressStorage = create<useParametersProgressStorage>((set) => ({
    currentParameter: "",
    hasParameterBeenModified: false,

    setCurrentParameter: (newValue) => set(() => ({currentParameter: newValue})),
    setHasParameterBeenModified: (newValue) => set(() => ({hasParameterBeenModified: newValue}))
}))