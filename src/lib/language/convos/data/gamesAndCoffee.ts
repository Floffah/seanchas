import { Conversation, ConversationSpeaker } from "@/lib/language/convos/types";

export const gamesAndCoffee: Conversation = {
    id: "games-and-coffee",
    name: "Games and Coffee",
    description:
        "Talking about video game preferences and asking if someone wants a coffee.",
    summaryQuestions: [
        {
            prompt: "What was the conversation about?",
            correctAnswer: "Talking about liking games and coffee.",
            incorrectAnswers: [
                "Buying a game in a shop.",
                "Talking about going out for dinner.",
            ],
        },
    ],
    utterances: [
        {
            id: "games-and-coffee.u0",
            speaker: ConversationSpeaker.A,
            translationFormat:
                "Do $games-and-coffee.you$ like Breath of the Wild?",
            incorrectTranslations: [
                "Do I like Breath of the Wild?",
                "Do you want Breath of the Wild?",
            ],
            incorrectResponseIds: [
                "games-and-coffee.u2",
                "games-and-coffee.u4",
            ],
            substitutionQuestion: {
                correctOverrides: {
                    "games-and-coffee.you": "games-and-coffee.you.formal",
                },
                incorrectOverrides: [
                    {
                        "games-and-coffee.you":
                            "games-and-coffee.you.incorrect",
                    },
                ],
            },
            parts: [
                { kind: "text", text: "An toil" },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "games-and-coffee.you",
                    base: "leat",
                    translation: "you",
                    variants: [
                        {
                            id: "games-and-coffee.you.formal",
                            text: "leibh",
                            translation: "you",
                            features: {
                                conceptTags: ["formal_you"],
                            },
                        },
                        {
                            id: "games-and-coffee.you.incorrect",
                            text: "leam",
                            translation: "me",
                        },
                    ],
                    features: {
                        conceptTags: ["informal_you"],
                    },
                },
                { kind: "text", text: " " },
                { kind: "text", text: "Breath of the Wild" },
                { kind: "punct", text: "?" },
            ],
        },
        {
            id: "games-and-coffee.u1",
            speaker: ConversationSpeaker.B,
            translationFormat: "Yes, I like it.",
            incorrectTranslations: ["No, I do not like it.", "Yes, I want it."],
            incorrectResponseIds: [
                "games-and-coffee.u3",
                "games-and-coffee.u4",
            ],
            parts: [
                { kind: "text", text: "’S toil leam e" },
                { kind: "punct", text: "!" },
            ],
        },
        {
            id: "games-and-coffee.u2",
            speaker: ConversationSpeaker.A,
            translationFormat: "I do not like Tears of the Kingdom.",
            incorrectTranslations: [
                "I like Tears of the Kingdom.",
                "I do not want Tears of the Kingdom.",
            ],
            incorrectResponseIds: [
                "games-and-coffee.u0",
                "games-and-coffee.u1",
            ],
            parts: [
                { kind: "text", text: "Cha toil leam" },
                { kind: "text", text: " " },
                { kind: "text", text: "Tears of the Kingdom" },
                { kind: "punct", text: "." },
            ],
        },
        {
            id: "games-and-coffee.u3",
            speaker: ConversationSpeaker.B,
            translationFormat:
                "Really? Do $games-and-coffee.coffeeYou$ want a coffee?",
            incorrectTranslations: [
                "Really? Do you like coffee?",
                "Really? Are you making coffee?",
            ],
            incorrectResponseIds: [
                "games-and-coffee.u1",
                "games-and-coffee.u2",
            ],
            substitutionQuestion: {
                correctOverrides: {
                    "games-and-coffee.coffeeYou":
                        "games-and-coffee.coffeeYou.formal",
                },
                incorrectOverrides: [
                    {
                        "games-and-coffee.coffeeYou":
                            "games-and-coffee.coffeeYou.incorrect",
                    },
                ],
            },
            parts: [
                { kind: "text", text: "Dha-rìribh" },
                { kind: "punct", text: "?" },
                { kind: "text", text: " " },
                { kind: "text", text: "A bheil" },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "games-and-coffee.coffeeYou",
                    base: "thu",
                    translation: "you",
                    variants: [
                        {
                            id: "games-and-coffee.coffeeYou.formal",
                            text: "sibh",
                            translation: "you",
                            features: {
                                conceptTags: ["formal_you"],
                            },
                        },
                        {
                            id: "games-and-coffee.coffeeYou.incorrect",
                            text: "iad",
                            translation: "they",
                        },
                    ],
                    features: {
                        conceptTags: ["informal_you"],
                    },
                },
                { kind: "text", text: " " },
                { kind: "text", text: "ag iarraidh cofaidh" },
                { kind: "punct", text: "?" },
            ],
        },
        {
            id: "games-and-coffee.u4",
            speaker: ConversationSpeaker.A,
            translationFormat: "Yes, thank you. With milk. No sugar.",
            incorrectTranslations: [
                "Yes, thank you. With sugar. No milk.",
                "No, thank you. With milk.",
            ],
            incorrectResponseIds: [
                "games-and-coffee.u0",
                "games-and-coffee.u2",
            ],
            parts: [
                { kind: "text", text: "Tha" },
                { kind: "punct", text: "," },
                { kind: "text", text: " tapadh leat" },
                { kind: "punct", text: "." },
                { kind: "text", text: " " },
                { kind: "text", text: "Le bainne" },
                { kind: "punct", text: "." },
                { kind: "text", text: " " },
                { kind: "text", text: "Gun siùcar" },
                { kind: "punct", text: "." },
            ],
        },
    ],
};
