import { Conversation, ConversationSpeaker } from "@/lib/language/convos/types";

export const gamesAndCoffee: Conversation = {
    id: "gamesAndCoffee",
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
            id: "gamesAndCoffee.u0",
            speaker: ConversationSpeaker.A,
            translationFormat:
                "Do $gamesAndCoffee.you$ like Breath of the Wild?",
            incorrectTranslations: [
                "Do I like Breath of the Wild?",
                "Do you want Breath of the Wild?",
            ],
            incorrectResponseIds: ["gamesAndCoffee.u2", "gamesAndCoffee.u4"],
            substitutionQuestion: {
                correctOverrides: {
                    "gamesAndCoffee.you": "gamesAndCoffee.you.formal",
                },
                incorrectOverrides: [
                    {
                        "gamesAndCoffee.you": "gamesAndCoffee.you.incorrect",
                    },
                ],
            },
            parts: [
                { kind: "text", text: "An toil" },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "gamesAndCoffee.you",
                    base: "leat",
                    translation: "you",
                    variants: [
                        {
                            id: "gamesAndCoffee.you.formal",
                            text: "leibh",
                            translation: "you",
                            features: {
                                conceptTags: ["formal_you"],
                            },
                        },
                        {
                            id: "gamesAndCoffee.you.incorrect",
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
            id: "gamesAndCoffee.u1",
            speaker: ConversationSpeaker.B,
            translationFormat: "Yes, I like it.",
            incorrectTranslations: ["No, I do not like it.", "Yes, I want it."],
            incorrectResponseIds: ["gamesAndCoffee.u3", "gamesAndCoffee.u4"],
            parts: [
                { kind: "text", text: "’S toil leam e" },
                { kind: "punct", text: "!" },
            ],
        },
        {
            id: "gamesAndCoffee.u2",
            speaker: ConversationSpeaker.A,
            translationFormat: "I do not like Tears of the Kingdom.",
            incorrectTranslations: [
                "I like Tears of the Kingdom.",
                "I do not want Tears of the Kingdom.",
            ],
            incorrectResponseIds: ["gamesAndCoffee.u0", "gamesAndCoffee.u1"],
            parts: [
                { kind: "text", text: "Cha toil leam" },
                { kind: "text", text: " " },
                { kind: "text", text: "Tears of the Kingdom" },
                { kind: "punct", text: "." },
            ],
        },
        {
            id: "gamesAndCoffee.u3",
            speaker: ConversationSpeaker.B,
            translationFormat:
                "Really? Do $gamesAndCoffee.coffeeYou$ want a coffee?",
            incorrectTranslations: [
                "Really? Do you like coffee?",
                "Really? Are you making coffee?",
            ],
            incorrectResponseIds: ["gamesAndCoffee.u1", "gamesAndCoffee.u2"],
            substitutionQuestion: {
                correctOverrides: {
                    "gamesAndCoffee.coffeeYou":
                        "gamesAndCoffee.coffeeYou.formal",
                },
                incorrectOverrides: [
                    {
                        "gamesAndCoffee.coffeeYou":
                            "gamesAndCoffee.coffeeYou.incorrect",
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
                    id: "gamesAndCoffee.coffeeYou",
                    base: "thu",
                    translation: "you",
                    variants: [
                        {
                            id: "gamesAndCoffee.coffeeYou.formal",
                            text: "sibh",
                            translation: "you",
                            features: {
                                conceptTags: ["formal_you"],
                            },
                        },
                        {
                            id: "gamesAndCoffee.coffeeYou.incorrect",
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
            id: "gamesAndCoffee.u4",
            speaker: ConversationSpeaker.A,
            translationFormat: "Yes, thank you. With milk. No sugar.",
            incorrectTranslations: [
                "Yes, thank you. With sugar. No milk.",
                "No, thank you. With milk.",
            ],
            incorrectResponseIds: ["gamesAndCoffee.u0", "gamesAndCoffee.u2"],
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
