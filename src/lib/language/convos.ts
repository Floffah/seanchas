export const conversations = [
    {
        name: "Greeting",
        description:
            "A simple greeting conversation. An introduction to Gaidhlig.",
        conversation: [
            {
                speaker: "A",
                textParts: [
                    {
                        base: "Madainn",
                        lenitionNeeded: true,
                        replacements: [
                            {
                                word: "Oidhche",
                                lenitionNeeded: true,
                            },
                            "Feasgar",
                        ],
                    },
                    {
                        base: "math!",
                        lenited: "mhath!",
                    },
                ],
            },
            {
                speaker: "B",
                textParts: [
                    {
                        base: "Madainn",
                        lenitionNeeded: true,
                        linked: {
                            conversationIdx: 0,
                            textPartIdx: 0,
                        },
                        replacements: [
                            {
                                word: "Oidhche",
                                lenitionNeeded: true,
                            },
                            "Feasgar",
                        ],
                    },
                    {
                        base: "math! ",
                        lenited: "mhath! ",
                    },
                    "Ciamar a tha thu?",
                ],
            },
            {
                speaker: "A",
                textParts: [
                    "Tha mi math, tapadh ",
                    {
                        base: "leibh",
                        replacements: ["leat"],
                    },
                    ". Ciamar a tha thu fhein?",
                ],
            },
            {
                speaker: "B",
                textParts: [
                    "Tha mi math cuideachd, tapadh ",
                    {
                        base: "leibh",
                        linked: {
                            conversationIdx: 2,
                            textPartIdx: 1,
                        },
                        replacements: ["leat"],
                    },
                    ".",
                ],
            },
        ],
    },
    {
        name: "Weather",
        description: "A conversation about the weather.",
        conversation: [
            {
                speaker: "A",
                textParts: ["Dè an t-sìde a th' ann?"],
            },
            {
                speaker: "B",
                textParts: ["Tha i math"],
            },
            {
                speaker: "A",
                textParts: ["A bheil i fuar?"],
            },
            {
                speaker: "B",
                textParts: ["Tha, tha i car fuar"],
            },
            {
                speaker: "A",
                textParts: ["A bheil an t-uisge ann?"],
            },
            {
                speaker: "B",
                textParts: ["Chan eil, chan eil an t-uisge ann"],
            },
        ],
    },
];
