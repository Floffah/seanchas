import { Conversation, ConversationSpeaker } from "@/lib/language/convos/types";

export const introductions: Conversation = {
    id: "introductions",
    name: "Introductions",
    description: "Greeting someone, asking their name, and inviting them in.",
    summaryQuestions: [
        {
            prompt: "What was the conversation about?",
            correctAnswer:
                "Greeting someone, asking their name, and inviting them in.",
            incorrectAnswers: [
                "Buying food and asking for directions.",
                "Discussing the weather and weekend plans.",
            ],
        },
    ],
    utterances: [
        {
            id: "introductions.u0",
            speaker: ConversationSpeaker.A,
            translationFormat: "Hello. Good $introductions.daySegment$.",
            incorrectTranslations: ["Hello. Good evening.", "Good afternoon."],
            incorrectResponseIds: ["introductions.u3", "introductions.u5"],
            parts: [
                { kind: "text", text: "Halò" },
                { kind: "punct", text: "." },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "introductions.daySegment",
                    base: "Madainn",
                    translation: "morning",
                },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "introductions.math",
                    base: "mhath",
                    translation: "good",
                },
                { kind: "punct", text: "." },
            ],
        },
        {
            id: "introductions.u1",
            speaker: ConversationSpeaker.B,
            translationFormat: "Hello. What is $introductions.nameYou$ name?",
            incorrectTranslations: [
                "Hello. Where are you from?",
                "Hello. What is your surname?",
            ],
            incorrectResponseIds: ["introductions.u0", "introductions.u4"],
            substitutionQuestion: {
                correctOverrides: {
                    "introductions.nameYou": "introductions.nameYou.informal",
                },
                incorrectOverrides: [
                    {
                        "introductions.nameYou":
                            "introductions.nameYou.incorrect",
                    },
                ],
            },
            parts: [
                { kind: "text", text: "Halò" },
                { kind: "punct", text: "." },
                { kind: "text", text: " " },
                { kind: "text", text: "Dè an t-ainm a th’" },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "introductions.nameYou",
                    base: "oirbh",
                    translation: "your",
                    variants: [
                        {
                            id: "introductions.nameYou.informal",
                            text: "ort",
                            translation: "your",
                            features: {
                                conceptTags: ["informal_you"],
                            },
                        },
                        {
                            id: "introductions.nameYou.incorrect",
                            text: "agad",
                            translation: "your",
                        },
                    ],
                    features: {
                        conceptTags: ["formal_you"],
                    },
                },
                { kind: "punct", text: "?" },
            ],
        },
        {
            id: "introductions.u2",
            speaker: ConversationSpeaker.A,
            translationFormat: "I am Allan Hutchison.",
            incorrectTranslations: [
                "My name is Allan Hutchison.",
                "I am Alan McDonald.",
            ],
            incorrectResponseIds: ["introductions.u0", "introductions.u5"],
            parts: [
                { kind: "text", text: "Is mise Ailean Hutchison" },
                { kind: "punct", text: "." },
            ],
        },
        {
            id: "introductions.u3",
            speaker: ConversationSpeaker.B,
            translationFormat: "How are $introductions.you$, Allan?",
            incorrectTranslations: [
                "Where are you, Allan?",
                "How old are you, Allan?",
            ],
            incorrectResponseIds: ["introductions.u1", "introductions.u5"],
            substitutionQuestion: {
                correctOverrides: {
                    "introductions.you": "introductions.you.informal",
                },
                incorrectOverrides: [
                    {
                        "introductions.you": "introductions.you.incorrect",
                    },
                ],
            },
            parts: [
                { kind: "text", text: "Ciamar a tha" },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "introductions.you",
                    base: "sibh",
                    translation: "you",
                    variants: [
                        {
                            id: "introductions.you.informal",
                            text: "thu",
                            translation: "you",
                            features: {
                                conceptTags: ["informal_you"],
                            },
                        },
                        {
                            id: "introductions.you.incorrect",
                            text: "sinn",
                            translation: "yous",
                        },
                    ],
                    features: {
                        conceptTags: ["formal_you"],
                    },
                },
                { kind: "punct", text: "," },
                { kind: "text", text: " Ailean" },
                { kind: "punct", text: "?" },
            ],
        },
        {
            id: "introductions.u4",
            speaker: ConversationSpeaker.A,
            translationFormat: "Very good, thank $introductions.thankYou$.",
            incorrectTranslations: [
                "Very bad, thank you.",
                "Quite well, goodbye.",
            ],
            incorrectResponseIds: ["introductions.u0", "introductions.u2"],
            substitutionQuestion: {
                correctOverrides: {
                    "introductions.thankYou": "introductions.thankYou.informal",
                },
                incorrectOverrides: [
                    {
                        "introductions.thankYou":
                            "introductions.thankYou.incorrect",
                    },
                ],
            },
            parts: [
                { kind: "text", text: "Glè mhath, tapadh" },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "introductions.thankYou",
                    base: "leibh",
                    translation: "you",
                    variants: [
                        {
                            id: "introductions.thankYou.informal",
                            text: "leat",
                            translation: "you",
                            features: {
                                conceptTags: ["informal_you"],
                            },
                        },
                        {
                            id: "introductions.thankYou.incorrect",
                            text: "sibh",
                            translation: "you",
                        },
                    ],
                    features: {
                        conceptTags: ["formal_you"],
                    },
                },
                { kind: "punct", text: "." },
            ],
        },
        {
            id: "introductions.u5",
            speaker: ConversationSpeaker.B,
            translationFormat: "Come in.",
            incorrectTranslations: ["Sit down.", "Go outside."],
            parts: [
                { kind: "text", text: "Thig a-steach" },
                { kind: "punct", text: "." },
            ],
        },
    ],
};
