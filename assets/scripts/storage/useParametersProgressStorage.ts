import { create } from "zustand";

interface useParametersProgressStorage {
    currentParameter: "" | "personality" | "memories" | "emotions";
    hasParameterBeenModified: boolean;
    isFolderVisible: boolean;

    resetParametersProgress: () => void;
    setCurrentParameter: (newValue: "" | "personality" | "memories" | "emotions") => void;
    setHasParameterBeenModified: (newValue: boolean) => void;
    setFolderVisibility: (visible: boolean) => void;
}

export const useParametersDisplayStateStorage = create<useParametersProgressStorage>((set) => ({
    currentParameter: "",
    hasParameterBeenModified: false,
    isFolderVisible: false,

    resetParametersProgress: () => set(({currentParameter: "", hasParameterBeenModified: false, isFolderVisible: false})),
    setCurrentParameter: (newValue) => set(() => ({currentParameter: newValue})),
    setHasParameterBeenModified: (newValue) => set(() => ({hasParameterBeenModified: newValue})),
    setFolderVisibility: (visible) => set(() => ({isFolderVisible: visible}))
}))