import { iconType } from "@/ui/svg"

export interface Character {
    id: number,
    name: string,
    description: string,
    pictures: string[],
    memories: Memory[]
}

export interface Memory {
    id: number,
    type: 'dashed' | 'filled' | 'dashedNoCursor',
    label: string,
    posX: number,
    posY: number
}

export interface Trait {
    id: number
    icon: iconType
    label: string
}

export interface ComposedTrait {
    id: number
    icon: iconType
    label: string
    traitA: number
    traitB: number
}

export interface Emotion {
    id: number
    label: string
    intensity: number //Between 0 and 1
}

export const characters = [
    {
        id: 0,
        name: "Mia",
        description: "il s'appelle bla bla bla",
        pictures: [
            "path",
            "path2"
        ],
        memories: [
            {
                id: 0,
                type: 'filled',
                label: "Harcèlement scolaire",
                posX: 120,
                posY: 150,
            },
            {
                id: 1,
                type: 'dashed',
                label: "Cookies avec la grand-mère",
                posX: 500,
                posY: 50,
            },
            {
                id: 2,
                type: 'dashedNoCursor',
                label: "Dispute avec les parents",
                posX: 300,
                posY: 250,
            }
        ] as Memory[],
        traits: [
            { id: 0, icon: "back-pain", label: "empathique" },
            { id: 1, icon: "back-pain", label: "travailleur" },
            { id: 2, icon: "back-pain", label: "égocentrique" },
            { id: 3, icon: "back-pain", label: "anxieux" },
            { id: 4, icon: "back-pain", label: "impulsif" },
            { id: 5, icon: "back-pain", label: "curieux" },
            { id: 6, icon: "back-pain", label: "sociable" },
            { id: 7, icon: "back-pain", label: "confiant" },
            { id: 8, icon: "back-pain", label: "calme" }
        ] as Trait[],
        composedTraits: [
            // Empathique
            { id: 0, label: "Dévoué", traitA: 0, traitB: 1, icon: "back-pain" },
            { id: 1, label: "Contradictoire", traitA: 0, traitB: 2, icon: "back-pain" },
            { id: 2, label: "Éponge", traitA: 0, traitB: 3, icon: "back-pain" },
            { id: 3, label: "Passionné", traitA: 0, traitB: 4, icon: "back-pain" },
            { id: 4, label: "Bienveillant", traitA: 0, traitB: 5, icon: "back-pain" },
            { id: 5, label: "Chaleureux", traitA: 0, traitB: 6, icon: "back-pain" },
            { id: 6, label: "Rassurant", traitA: 0, traitB: 7, icon: "back-pain" },
            { id: 7, label: "Apaisant", traitA: 0, traitB: 8, icon: "back-pain" },

            // Travailleur
            { id: 8, label: "Carriériste", traitA: 1, traitB: 2, icon: "back-pain" },
            { id: 9, label: "Obsessionnel", traitA: 1, traitB: 3, icon: "back-pain" },
            { id: 10, label: "Acharné", traitA: 1, traitB: 4, icon: "back-pain" },
            { id: 11, label: "Persévérant", traitA: 1, traitB: 5, icon: "back-pain" },
            { id: 12, label: "Coopératif", traitA: 1, traitB: 6, icon: "back-pain" },
            { id: 13, label: "Déterminé", traitA: 1, traitB: 7, icon: "back-pain" },
            { id: 14, label: "Fiable", traitA: 1, traitB: 8, icon: "back-pain" },

            // Égocentrique
            { id: 15, label: "Insécure", traitA: 2, traitB: 3, icon: "back-pain" },
            { id: 16, label: "Téméraire", traitA: 2, traitB: 4, icon: "back-pain" },
            { id: 17, label: "Fouineur", traitA: 2, traitB: 5, icon: "back-pain" },
            { id: 18, label: "Superficiel", traitA: 2, traitB: 6, icon: "back-pain" },
            { id: 19, label: "Arrogant", traitA: 2, traitB: 7, icon: "back-pain" },
            { id: 20, label: "Froid", traitA: 2, traitB: 8, icon: "back-pain" },

            // Anxieux
            { id: 21, label: "Explosif", traitA: 3, traitB: 4, icon: "back-pain" },
            { id: 22, label: "Inquiet", traitA: 3, traitB: 5, icon: "back-pain" },
            { id: 23, label: "Dépendant", traitA: 3, traitB: 6, icon: "back-pain" },
            { id: 24, label: "Instable", traitA: 3, traitB: 7, icon: "back-pain" },
            { id: 25, label: "Tendu", traitA: 3, traitB: 8, icon: "back-pain" },

            // Impulsif
            { id: 26, label: "Aventureux", traitA: 4, traitB: 5, icon: "back-pain" },
            { id: 27, label: "Envahissant", traitA: 4, traitB: 6, icon: "back-pain" },
            { id: 28, label: "Casse-cou", traitA: 4, traitB: 7, icon: "back-pain" },
            { id: 29, label: "Imprévisible", traitA: 4, traitB: 8, icon: "back-pain" },

            // Combinaisons finales
            { id: 30, label: "Bavard", traitA: 5, traitB: 6, icon: "back-pain" },
            { id: 31, label: "Intrépide", traitA: 5, traitB: 7, icon: "back-pain" },
            { id: 32, label: "Observateur", traitA: 5, traitB: 8, icon: "back-pain" },
            { id: 33, label: "Charismatique", traitA: 6, traitB: 7, icon: "back-pain" },
            { id: 34, label: "Agréable", traitA: 6, traitB: 8, icon: "back-pain" },
            { id: 35, label: "Assuré", traitA: 7, traitB: 8, icon: "back-pain" }
        ] as ComposedTrait[],
        emotions: [
            {
                id: 0,
                intensity: 1,
                label: "Colère"
            },
            {
                id: 1,
                intensity: 1,
                label: "Joie"
            },
            {
                id: 2,
                intensity: 1,
                label: "Tristesse"
            },
            {
                id: 3,
                intensity: 1,
                label: "Peur"
            },
        ] as Emotion[]
    },
]