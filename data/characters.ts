export const characters = [
    {
        id: 0,
        name: "Jacques",
        description: "il s'appelle bla bla bla",
        pictures: [
            "path",
            "path2"
        ],
        day: 0,
        currentEmotions: [
            {joy: 1.},
            {confidence: 0},
            {fear: 1.},
            // {surprise: .2},
            // {sadness: .2},
            // {disgust: .2},
            // {anger: .2},
            // {vigilance: .2},
        ],
        currentOrderId: "0",
    },
]

export const Orders = [
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
                    {joy: 1.},
                    {confidence: 0},
                    {fear: 1.},
                    // {surprise: .2},
                    // {sadness: .2},
                    // {disgust: .2},
                    // {anger: .2},
                    // {vigilance: .2},
                ],
                orderId: "0-1",
                isSatisfied: false,
            },
            {
                emotions: [
                    {joy: 1.},
                    {confidence: 0},
                    {fear: 1.},
                    // {surprise: .2},
                    // {sadness: .2},
                    // {disgust: .2},
                    // {anger: .2},
                    // {vigilance: .2},
                ],
                orderId: "0-2",
                isSatisfied: false,
            },
            {
                emotions: [
                    {joy: 1.},
                    {confidence: 0},
                    {fear: 1.},
                    // {surprise: .2},
                    // {sadness: .2},
                    // {disgust: .2},
                    // {anger: .2},
                    // {vigilance: .2},
                ],
                orderId: "0-3",
                isSatisfied: false,
            }
        ]
    },

    {
        id: "0-1",
        characterId: 0,
        targetEmotion: [
            {joy: 1.},
            {confidence: 0},
            {fear: 1.},
            // {surprise: .2},
            // {sadness: .2},
            // {disgust: .2},
            // {anger: .2},
            // {vigilance: .2},
        ],
        possibleResults: [
            {
                emotions: [
                    {joy: 1.},
                    {confidence: 0},
                    {fear: 1.},
                    // {surprise: .2},
                    // {sadness: .2},
                    // {disgust: .2},
                    // {anger: .2},
                    // {vigilance: .2},
                ],
                orderId: "1-1",
                isSatisfied: false,
            },
            {
                emotions: [
                    {joy: 1.},
                    {confidence: 0},
                    {fear: 1.},
                    // {surprise: .2},
                    // {sadness: .2},
                    // {disgust: .2},
                    // {anger: .2},
                    // {vigilance: .2},
                ],
                orderId: "1-2",
                isSatisfied: false,
            }
        ]
    }
]

export const days = [
    {
        characters: [],
        additionalCharacters: [] // If a main character died, we want to fill a replacement character to keep content.
    }
]

export const endings = [
    
]