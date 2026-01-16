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
            {
                id: 0,
                icon: "comet",
                label: "joueur"
            },
            {
                id: 1,
                icon: "back-pain",
                label: "rêveur"
            },
            {
                id: 2,
                icon: "beech",
                label: "penseur"
            },
            {
                id: 3,
                icon: "comet",
                label: "frimeur"
            },
            {
                id: 4,
                icon: "back-pain",
                label: "calculateur"
            },
            {
                id: 5,
                icon: "beech",
                label: "méchant"
            },
            {
                id: 6,
                icon: "comet",
                label: "gentil"
            },
            {
                id: 7,
                icon: "back-pain",
                label: "très méchant"
            },
            {
                id: 8,
                icon: "beech",
                label: "très gentil"
            },
            {
                id: 9,
                icon: "beech",
                label: "très très très rien"
            },
        ] as Trait[],
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