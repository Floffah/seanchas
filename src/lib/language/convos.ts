import { Side } from "@floating-ui/utils";

export enum ConversationSpeaker {
    A,
    B,
    System,
}

export type ConversationId = string;
export type UtteranceId = string;
export type TokenId = string;

export type Speaker = ConversationSpeaker;

export type Conversation = {
    id: ConversationId;
    name: string;
    description?: string;
    utterances: Utterance[];
};

export type Utterance = {
    id: UtteranceId;
    speaker: Speaker;
    parts: Part[];
    translationFormat: string; // e.g. "$someId $someOtherId"
};

export type Part = TokenRefPart | TextPart | TokenPart | PunctPart;

export type TextPart = {
    kind: "text";
    text: string;
    translation?: string;
};

export type PunctPart = {
    kind: "punct";
    text: string;
};

export type TokenPart = {
    kind: "token";
    id: TokenId;
    base: string;
    features?: TokenFeatures; // formal/informal, lemma, etc
    variants?: Variant[]; // substitutions / alternatives
    transforms?: Transform[]; // how word can change (lenition etc)
    tips?: TipRef[]; // possible tips attached to this token
    translation?: string;
    syncVariantWith?: TokenId; // if set, this token's variant changes in sync with the referenced token. NOT the same as a reference, syncs e.g sibh with leibh, thu with leat
};

export type TokenRefPart = {
    kind: "token_ref";
    ref: TokenId;
};

export type TokenFeatures = {
    gender?: "masculine" | "feminine"; // for mutation rules
    register?: "formal" | "informal";
    conceptTags?: string[];
};

export type Variant = {
    id: string;
    text: string;
    transforms?: Transform[]; // e.g. variant also lenites in context
    features?: Partial<TokenFeatures>;
    tips?: TipRef[];
    translation?: string;
};

export type Transform = {
    type: "lenition";
    map?: Record<string, string>; // { "math": "mhath" }
    when?: {
        variantPresent?: string; // only apply if a specific variant is chosen
        featureEquals?: { [featureName: string]: string }; // only apply if token has a specific feature value
    };
    causeId?: TokenId; // optional link to the token that causes this transform
    reason?: string;
};

export type TipRef = {
    tipId: string;
    side?: Side;
    when:
        | {
              type: "on_transform";
              transform: "lenition";
              from?: string;
              to?: string;
          }
        | { type: "on_variant"; variantId: string }
        | { type: "always" };
};

export type Tip = {
    id: string;
    title: string;
    body: string;
    policy?: { show: "once" | "always" };
};

export const globalTips: Record<string, Tip> = {
    lenition_math: {
        id: "lenition_math",
        title: "See what happened there?",
        body: "After certain words, the next word can change at the start. Here, *math* becomes *mhath*.",
        policy: { show: "once" },
    },
    adjectives_after_words: {
        id: "adjectives_after_words",
        title: "Look!",
        body: "Adjectives always come after the thing they're describing in Gaelic.",
    },
    gu_math: {
        id: "gu_math",
        title: "Gu-ing",
        body: "Notice here we can't just say math (good) on its own. We have to add 'gu' in front to make it an adverb. This changes the meaning more to 'well'!",
    },
};

export const greeting: Conversation = {
    id: "greeting",
    name: "Greeting",
    description: "A simple greeting conversation. An introduction to Gaidhlig.",
    utterances: [
        {
            id: "greeting.u0",
            speaker: ConversationSpeaker.A,
            translationFormat: "$greeting.math$ $greeting.daySegment$!",
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
                    base: "math!",
                    translation: "good",
                    transforms: [
                        {
                            type: "lenition",
                            causeId: "greeting.daySegment",
                            when: {
                                variantPresent: "greeting.daySegment.madainn",
                            },
                            map: { "math!": "mhath!" },
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
                        {
                            tipId: "lenition_basic",
                            when: {
                                type: "on_transform",
                                transform: "lenition",
                            },
                        },
                    ],
                },
            ],
        },

        {
            id: "greeting.u1",
            speaker: ConversationSpeaker.B,
            translationFormat:
                "$greeting.math$ $greeting.daySegment$. How are $greeting.you$?",
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
                { kind: "text", text: " " },
                { kind: "text", text: "Ciamar a tha" },
                { kind: "text", text: " " },
                {
                    kind: "token",
                    id: "greeting.you",
                    base: "thu",
                    translation: "you (informal)",
                    variants: [
                        {
                            id: "greeting.you.informal",
                            text: "sibh",
                            translation: "you (formal)",
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
            translationFormat: "I am good, thank $greeting.tyou$.",
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
                    translation: "you (informal)",
                    variants: [
                        {
                            id: "greeting.tyou.formal",
                            text: "leibh",
                            translation: "you (formal)",
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

export const conversations = [greeting];

export type DisplayEvent =
    | {
          type: "show_utterance";
          utteranceId: UtteranceId;
      }
    | {
          type: "show_tip";
          tipId: string;
          tokenId?: TokenId;
          side?: Side;
      };

export function conversationToEvents(convo: Conversation): DisplayEvent[] {
    const events: DisplayEvent[] = [];

    for (const utterance of convo.utterances) {
        events.push({ type: "show_utterance", utteranceId: utterance.id });

        for (const part of utterance.parts) {
            if (part.kind === "token" && part.tips) {
                for (const tipRef of part.tips) {
                    if (tipRef.when.type === "always") {
                        events.push({
                            type: "show_tip",
                            tipId: tipRef.tipId,
                            tokenId: part.id,
                            side: tipRef.side,
                        });
                    }
                }
            }
        }
    }

    return events;
}
