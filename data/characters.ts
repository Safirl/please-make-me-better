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
            { id: 0, icon: "empathique", label: "empathique" },
            { id: 1, icon: "travailleur", label: "travailleur" },
            { id: 2, icon: "egocentrique", label: "égocentrique" },
            { id: 3, icon: "anxieux", label: "anxieux" },
            { id: 4, icon: "impulsif", label: "impulsif" },
            { id: 5, icon: "curieux", label: "curieux" },
            { id: 6, icon: "sociable", label: "sociable" },
            { id: 7, icon: "confiant", label: "confiant" },
            { id: 8, icon: "calme", label: "calme" }
        ] as Trait[],
        composedTraits: [
            // Empathique
            { id: 0, label: "Dévoué", traitA: 0, traitB: 1, icon: "devoue" },
            { id: 1, label: "Contradictoire", traitA: 0, traitB: 2, icon: "eponge" },
            { id: 2, label: "Éponge", traitA: 0, traitB: 3, icon: "eponge" },
            { id: 3, label: "Passionné", traitA: 0, traitB: 4, icon: "passione" },
            { id: 4, label: "Bienveillant", traitA: 0, traitB: 5, icon: "bienveillant" },
            { id: 5, label: "Chaleureux", traitA: 0, traitB: 6, icon: "chaleureux" },
            { id: 6, label: "Rassurant", traitA: 0, traitB: 7, icon: "rassurant" },
            { id: 7, label: "Apaisant", traitA: 0, traitB: 8, icon: "apaisant" },

            // Travailleur
            { id: 8, label: "Carriériste", traitA: 1, traitB: 2, icon: "carrieriste" },
            { id: 9, label: "Obsessionnel", traitA: 1, traitB: 3, icon: "obsessionnel" },
            { id: 10, label: "Acharné", traitA: 1, traitB: 4, icon: "acharne" },
            { id: 11, label: "Persévérant", traitA: 1, traitB: 5, icon: "perseverant" },
            { id: 12, label: "Coopératif", traitA: 1, traitB: 6, icon: "cooperatif" },
            { id: 13, label: "Déterminé", traitA: 1, traitB: 7, icon: "determine" },
            { id: 14, label: "Fiable", traitA: 1, traitB: 8, icon: "fiable" },

            // Égocentrique
            { id: 15, label: "Insécure", traitA: 2, traitB: 3, icon: "insecure" },
            { id: 16, label: "Téméraire", traitA: 2, traitB: 4, icon: "temeraire" },
            { id: 17, label: "Fouineur", traitA: 2, traitB: 5, icon: "fouineur" },
            { id: 18, label: "Superficiel", traitA: 2, traitB: 6, icon: "superficiel" },
            { id: 19, label: "Arrogant", traitA: 2, traitB: 7, icon: "arrogant" },
            { id: 20, label: "Froid", traitA: 2, traitB: 8, icon: "froid" },

            // Anxieux
            { id: 21, label: "Explosif", traitA: 3, traitB: 4, icon: "explosif" },
            { id: 22, label: "Inquiet", traitA: 3, traitB: 5, icon: "inquiet" },
            { id: 23, label: "Dépendant", traitA: 3, traitB: 6, icon: "dependant" },
            { id: 24, label: "Instable", traitA: 3, traitB: 7, icon: "instable" },
            { id: 25, label: "Tendu", traitA: 3, traitB: 8, icon: "tendu" },

            // Impulsif
            { id: 26, label: "Aventureux", traitA: 4, traitB: 5, icon: "aventureux" },
            { id: 27, label: "Envahissant", traitA: 4, traitB: 6, icon: "envahissant" },
            { id: 28, label: "Casse-cou", traitA: 4, traitB: 7, icon: "casse-cou" },
            { id: 29, label: "Imprévisible", traitA: 4, traitB: 8, icon: "imprevisible" },

            // Combinaisons finales
            { id: 30, label: "Bavard", traitA: 5, traitB: 6, icon: "bavard" },
            { id: 31, label: "Intrépide", traitA: 5, traitB: 7, icon: "intrepide" },
            { id: 32, label: "Observateur", traitA: 5, traitB: 8, icon: "observateur" },
            { id: 33, label: "Charismatique", traitA: 6, traitB: 7, icon: "charismatique" },
            { id: 34, label: "Agréable", traitA: 6, traitB: 8, icon: "agreable" },
            { id: 35, label: "Assuré", traitA: 7, traitB: 8, icon: "assure" }
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