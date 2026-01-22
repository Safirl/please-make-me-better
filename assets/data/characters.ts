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
    posY: number,
    path: number,
    pathErased: number
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
    value: number
    path: number
}

export interface Emotion {
    id: number
    slug: "joie" | "tristesse" | "serenite" | "colere"
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
                label: "Cookies avec la grand-mère ",
                posX: .2,
                posY: .7,
                path: 0,
                pathErased: 2
            }
            ,
            {
                id: 1,
                type: 'dashed',
                label: "Dispute avec les parents ",
                posX: .8,
                posY: .45,
                path: 1,
                pathErased: 0
            }
            ,
            {
                id: 2,
                type: 'dashedNoCursor',
                label: "Harcèlement scolaire",
                posX: .3,
                posY: .32,
                path: 2,
                pathErased: 0
            }
            ,
            {
                id: 3,
                type: 'dashedNoCursor',
                label: "Peur du miroir",
                posX: .6,
                posY: .8,
                path: 2,
                pathErased: 1
            }
        ] as Memory[],
        traits: [
            { id: 0, icon: "empathique", label: "Empathique" },
            { id: 1, icon: "travailleur", label: "Travailleur" },
            { id: 2, icon: "egocentrique", label: "Egocentrique" },
            { id: 3, icon: "anxieux", label: "Anxieux" },
            { id: 4, icon: "impulsif", label: "Impulsif" },
            { id: 5, icon: "curieux", label: "Curieux" },
            { id: 6, icon: "sociable", label: "Sociable" },
            { id: 7, icon: "confiant", label: "Confiant" },
            { id: 8, icon: "calme", label: "Calme" },
            { id: 9, icon: "creatif", label: "Créatif" }
        ] as Trait[],
        composedTraits: [
            { id: 0, label: "Dévoué", traitA: 0, traitB: 1, icon: "devoue", value: 0.05, path: 0 },
            { id: 1, label: "Contradictoire", traitA: 0, traitB: 2, icon: "eponge", value: 0.6, path: 2 },
            { id: 2, label: "Éponge", traitA: 0, traitB: 3, icon: "eponge", value: 0.7, path: 2 },
            { id: 3, label: "Passionné", traitA: 0, traitB: 4, icon: "passione", value: 0.2, path: 0 },
            { id: 4, label: "Bienveillant", traitA: 0, traitB: 5, icon: "bienveillant", value: 0.05, path: 0 },
            { id: 5, label: "Chaleureux", traitA: 0, traitB: 6, icon: "chaleureux", value: 0.1, path: 0 },
            { id: 6, label: "Rassurant", traitA: 0, traitB: 7, icon: "rassurant", value: 0.05, path: 0 },
            { id: 7, label: "Apaisant", traitA: 0, traitB: 8, icon: "apaisant", value: 0, path: 0 },

            { id: 8, label: "Carriériste", traitA: 1, traitB: 2, icon: "carrieriste", value: 0.55, path: 1 },
            { id: 9, label: "Obsessionnel", traitA: 1, traitB: 3, icon: "obsessionnel", value: 0.7, path: 2 },
            { id: 10, label: "Acharné", traitA: 1, traitB: 4, icon: "acharne", value: 0.4, path: 1 },
            { id: 11, label: "Persévérant", traitA: 1, traitB: 5, icon: "perseverant", value: 0.15, path: 0 },
            { id: 12, label: "Coopératif", traitA: 1, traitB: 6, icon: "cooperatif", value: 0.1, path: 0 },
            { id: 13, label: "Déterminé", traitA: 1, traitB: 7, icon: "determine", value: 0.1, path: 0 },
            { id: 14, label: "Fiable", traitA: 1, traitB: 8, icon: "fiable", value: 0.05, path: 0 },

            { id: 15, label: "Insécure", traitA: 2, traitB: 3, icon: "insecure", value: 0.75, path: 2 },
            { id: 16, label: "Téméraire", traitA: 2, traitB: 4, icon: "temeraire", value: 0.55, path: 1 },
            { id: 17, label: "Fouineur", traitA: 2, traitB: 5, icon: "fouineur", value: 0.65, path: 1 },
            { id: 18, label: "Superficiel", traitA: 2, traitB: 6, icon: "superficiel", value: 0.8, path: 1 },
            { id: 19, label: "Arrogant", traitA: 2, traitB: 7, icon: "arrogant", value: 0.85, path: 2 },
            { id: 20, label: "Froid", traitA: 2, traitB: 8, icon: "froid", value: 0.75, path: 2 },

            { id: 21, label: "Explosif", traitA: 3, traitB: 4, icon: "explosif", value: 0.8, path: 1 },
            { id: 22, label: "Inquiet", traitA: 3, traitB: 5, icon: "inquiet", value: 0.65, path: 2 },
            { id: 23, label: "Dépendant", traitA: 3, traitB: 6, icon: "dependant", value: 0.75, path: 2 },
            { id: 24, label: "Instable", traitA: 3, traitB: 7, icon: "instable", value: 0.8, path: 2 },
            { id: 25, label: "Tendu", traitA: 3, traitB: 8, icon: "tendu", value: 0.7, path: 2 },

            { id: 26, label: "Aventureux", traitA: 4, traitB: 5, icon: "aventure", value: 0.2, path: 1 },
            { id: 27, label: "Envahissant", traitA: 4, traitB: 6, icon: "envahissant", value: 0.8, path: 2 },
            { id: 28, label: "Casse-cou", traitA: 4, traitB: 7, icon: "casse-cou", value: 0.6, path: 1 },
            { id: 29, label: "Imprévisible", traitA: 4, traitB: 8, icon: "imprevisible", value: 0.6, path: 1 },

            { id: 30, label: "Bavard", traitA: 5, traitB: 6, icon: "bavard", value: 0, path: 0 },
            { id: 31, label: "Intrépide", traitA: 5, traitB: 7, icon: "intrepide", value: 0, path: 0 },
            { id: 32, label: "Observateur", traitA: 5, traitB: 8, icon: "observateur", value: 0, path: 0 },
            { id: 33, label: "Charismatique", traitA: 6, traitB: 7, icon: "charismatique", value: 0, path: 1 },
            { id: 34, label: "Agréable", traitA: 6, traitB: 8, icon: "agreable", value: 0, path: 1 },
            { id: 35, label: "Assuré", traitA: 7, traitB: 8, icon: "assure", value: 0, path: 1 },

            { id: 36, label: "Sensible", traitA: 9, traitB: 0, icon: "sensible", value: 0.15, path: 0 },
            { id: 37, label: "Ingénieux", traitA: 9, traitB: 1, icon: "ingenieux", value: 0.1, path: 1 },
            { id: 38, label: "Vaniteux", traitA: 9, traitB: 2, icon: "vaniteux", value: 0.75, path: 2 },
            { id: 39, label: "Tourmenté", traitA: 9, traitB: 3, icon: "tourmente", value: 0.65, path: 2 },
            { id: 40, label: "Spontané", traitA: 9, traitB: 4, icon: "spontane", value: 0.25, path: 1 },
            { id: 41, label: "Inventif", traitA: 9, traitB: 5, icon: "inventif", value: 0.05, path: 0 },
            { id: 42, label: "Excentrique", traitA: 9, traitB: 6, icon: "excentrique", value: 0.4, path: 1 },
            { id: 43, label: "Audacieux", traitA: 9, traitB: 7, icon: "audacieux", value: 0.15, path: 0 },
            { id: 44, label: "Inspiré", traitA: 9, traitB: 8, icon: "inspire", value: 0.1, path: 0 }
        ] as ComposedTrait[],
        emotions: [
            {
                id: 0,
                slug: "colere",
                intensity: 0,
                label: "Colère"
            },
            {
                id: 1,
                slug: "joie",
                intensity: .5,
                label: "Joie"
            },
            {
                id: 2,
                slug: "tristesse",
                intensity: .9,
                label: "Tristesse"
            },
            {
                id: 3,
                slug: "serenite",
                intensity: 0,
                label: "Sérénité"
            },
        ] as Emotion[]
    },
]