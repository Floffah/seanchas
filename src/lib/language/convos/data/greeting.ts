import { Conversation, ConversationSpeaker } from "@/lib/language/convos/types";

export const greeting: Conversation = {
    id: "greeting",
    name: "Greeting",
    description: "A simple greeting conversation. An introduction to Gaidhlig.",
    utterances: [
        {
            id: "greeting.u0",
            speaker: ConversationSpeaker.A,
            translationFormat: "$greeting.math$ $greeting.daySegment$!",
            incorrectTranslations: ["Good day!", "Hello!"],
            incorrectResponseIds: ["greeting.u2", "greeting.u3"],

            parts: [
                {
                    kind: "token",
                    id: "greeting.daySegment",
                    base: "Feasgar",
                    translation: "afternoon/evening",
                    variants: [
                        {
                            id: "greeting.daySegment.oidhche",
                            text: "Oidhche",
                            features: { gender: "feminine" },
                            translation: "night",
                        },
                        {
                            id: "greeting.daySegment.madainn",
                            text: "Madainn",
                            features: { gender: "feminine" },
                            translation: "morning",
                        },
                    ],
                },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "greeting.math",
                    base: "math",
                    translation: "good",
                    transforms: [
                        {
                            type: "lenition",
                            causeId: "greeting.daySegment",
                            when: {
                                variantPresent: "greeting.daySegment.madainn",
                            },
                            becomes: "mhath",
                        },
                    ],
                    tips: [
                        {
                            tipId: "adjectives_after_words",
                            side: "right",
                            when: {
                                type: "always",
                            },
                        },
                    ],
                },
                { kind: "punct", text: "!" },
            ],
        },

        {
            id: "greeting.u1",
            speaker: ConversationSpeaker.B,
            translationFormat:
                "$greeting.math$ $greeting.daySegment$. How are $greeting.you$?",
            incorrectTranslations: [
                "Good day. What's up?",
                "Hello. How are $greeting.you$?",
            ],
            incorrectResponseIds: ["greeting.u0", "greeting.u3"],
            parts: [
                {
                    kind: "token_ref",
                    ref: "greeting.daySegment",
                },
                { kind: "text", text: " " },
                {
                    kind: "token_ref",
                    ref: "greeting.math",
                },
                { kind: "text", text: ". " },
                { kind: "text", text: "Ciamar a tha" },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "greeting.you",
                    base: "thu",
                    translation: "you",
                    variants: [
                        {
                            id: "greeting.you.informal",
                            text: "sibh",
                            translation: "you",
                            features: { conceptTags: ["formal_you"] },
                        },
                    ],
                    features: { conceptTags: ["informal_you"] },
                },
                { kind: "punct", text: "?" },
            ],
        },

        {
            id: "greeting.u2",
            speaker: ConversationSpeaker.A,
            translationFormat:
                "I am good, thank $greeting.tyou$. How are $greeting.you$?",
            incorrectTranslations: [
                "I am bad, thank $greeting.tyou$. How are $greeting.you$?",
                "I am tired, thank $greeting.tyou$. How are $greeting.you$?",
            ],
            incorrectResponseIds: ["greeting.u0", "greeting.u1"],
            parts: [
                {
                    kind: "text",
                    text: "Tha mi",
                },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "greeting.gu",
                    base: "gu",
                    tips: [
                        {
                            tipId: "gu_math",
                            when: {
                                type: "always",
                            },
                        },
                    ],
                },
                { kind: "text", text: " " },
                {
                    kind: "text",
                    text: "math, tapadh",
                },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "greeting.tyou",
                    base: "leat",
                    translation: "you",
                    variants: [
                        {
                            id: "greeting.tyou.formal",
                            text: "leibh",
                            translation: "you",
                            features: {
                                conceptTags: ["formal_you"],
                            },
                        },
                    ],
                    features: { conceptTags: ["informal_you"] },
                    syncVariantWith: "greeting.you",
                },
                { kind: "punct", text: "." },
                { kind: "text", text: " " },
                {
                    kind: "text",
                    text: "Ciamar a tha",
                },
                { kind: "text", text: " " },
                {
                    kind: "token_ref",
                    ref: "greeting.you",
                },
                { kind: "punct", text: "?" },
            ],
        },
        {
            id: "greeting.u3",
            speaker: ConversationSpeaker.B,
            translationFormat: "I am good too, thank $greeting.tyou$.",
            parts: [
                {
                    kind: "text",
                    text: "Tha mi gu math cuideachd, tapadh",
                    translation: "I am good too, thanks",
                },
                { kind: "text", text: " " },
                {
                    kind: "token_ref",
                    ref: "greeting.tyou",
                },
                { kind: "punct", text: "." },
            ],
        },
    ],
};
