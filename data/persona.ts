export const characters = [
    {
        id: 0,
        name: "Jacques",
        description: "il s'appelle bla bla bla",
        pictures: [
            "path",
            "path2"
        ],
        currentEmotions: [
            {joie: 1.},
            {confiance: 0},
            {peur: 1.},
            // {surprise: .2},
            // {tristesse: .2},
            // {degout: .2},
            // {colere: .2},
            // {vigilance: .2},
        ],
        currentCommandId: "0",
    },
]

const commands = [
    {
        id: "0",
        description: "lorem ipsum",
        pictures: [
            "path",
            "path2"
        ],
        characterId: 0,
        possibleResults: [
            {
                emotions: [
                    {joie: 1.},
                    {confiance: 0},
                    {peur: 1.},
                    // {surprise: .2},
                    // {tristesse: .2},
                    // {degout: .2},
                    // {colere: .2},
                    // {vigilance: .2},
                ],
                nextPath: "0-1",
                isSatisfied: false,
            },
            {
                emotions: [
                    {joie: 1.},
                    {confiance: 0},
                    {peur: 1.},
                    // {surprise: .2},
                    // {tristesse: .2},
                    // {degout: .2},
                    // {colere: .2},
                    // {vigilance: .2},
                ],
                nextPath: "0-2",
                isSatisfied: false,
            },
            {
                emotions: [
                    {joie: 1.},
                    {confiance: 0},
                    {peur: 1.},
                    // {surprise: .2},
                    // {tristesse: .2},
                    // {degout: .2},
                    // {colere: .2},
                    // {vigilance: .2},
                ],
                nextPath: "0-3",
                isSatisfied: false,
            }
        ]
    },

    {
        id: "0-1",
        characterId: 0,
        targetEmotion: [
            {joie: 1.},
            {confiance: 0},
            {peur: 1.},
            // {surprise: .2},
            // {tristesse: .2},
            // {degout: .2},
            // {colere: .2},
            // {vigilance: .2},
        ],
        possibleResults: [
            {
                emotions: [
                    {joie: 1.},
                    {confiance: 0},
                    {peur: 1.},
                    // {surprise: .2},
                    // {tristesse: .2},
                    // {degout: .2},
                    // {colere: .2},
                    // {vigilance: .2},
                ],
                nextPath: "1-1",
                isSatisfied: false,
            },
            {
                emotions: [
                    {joie: 1.},
                    {confiance: 0},
                    {peur: 1.},
                    // {surprise: .2},
                    // {tristesse: .2},
                    // {degout: .2},
                    // {colere: .2},
                    // {vigilance: .2},
                ],
                nextPath: "1-2",
                isSatisfied: false,
            }
        ]
    }
]