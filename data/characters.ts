export interface character {
    id: number,
    name: string,
    description: string,
    pictures: string[],
    memories: memory[]
}

export interface memory {
    type: string,
    label: string,
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
                type: "filled",
                label: "Harcèlement scolaire"
            },
            {
                type: "dashed",
                label: "Cookies avec la grand-mère"
            },
            {
                type: "dashedNoCursor",
                label: "Dispute avec les parents"
            }
        ] 
    },
]