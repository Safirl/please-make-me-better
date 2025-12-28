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
    id: number,
    icon: iconType,
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
                icon: "comet"
            },
            {
                id: 1,
                icon: "back-pain"
            },
            {
                id: 2,
                icon: "beech"
            },
            {
                id: 3,
                icon: "comet"
            },
            {
                id: 4,
                icon: "back-pain"
            },
            {
                id: 5,
                icon: "beech"
            },
            {
                id: 6,
                icon: "comet"
            },
            {
                id: 7,
                icon: "back-pain"
            },
            {
                id: 8,
                icon: "beech"
            },
            {
                id: 9,
                icon: "beech"
            },
        ] as Trait[]
    },
]