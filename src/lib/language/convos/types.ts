import { Side } from "@floating-ui/utils";

import { globalTips } from "@/lib/language/convos/tips";

export enum ConversationSpeaker {
    A,
    B,
    System,
}

export type ConversationId = string;
export type UtteranceId = string;
export type TokenId = string;
export type TokenOverrideMap = Partial<Record<TokenId, TokenId>>;

export interface SubstitutionQuestion {
    correctOverrides: TokenOverrideMap;
    incorrectOverrides: TokenOverrideMap[];
}

export interface SummaryQuestion {
    prompt: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

export type Speaker = ConversationSpeaker;

export interface Conversation {
    id: ConversationId;
    name: string;
    description?: string;
    summaryQuestions?: SummaryQuestion[];
    utterances: Utterance[];
}

export interface Utterance {
    id: UtteranceId;
    speaker: Speaker;
    parts: Part[];
    translationFormat: string; // e.g. "$someId$ $someOtherId$"
    incorrectTranslations?: string[]; // wrong translations to show as options in a quiz
    incorrectResponseIds?: UtteranceId[]; // wrong response utterance ids to show as options in a response quiz
    substitutionQuestion?: SubstitutionQuestion; // substitutions to show as options in a substitution quiz
}

export type Part = TokenRefPart | TextPart | TokenPart | PunctPart;

export interface TextPart {
    kind: "text";
    text: string;
    translation?: string;
}

export interface PunctPart {
    kind: "punct";
    text: string;
}

export interface TokenPart {
    kind: "token";
    id: TokenId;
    base: string;
    features?: TokenFeatures; // formal/informal, lemma, etc
    variants?: Variant[]; // substitutions / alternatives
    transforms?: Transform[]; // how word can change (lenition etc)
    tips?: TipRef[]; // possible tips attached to this token
    translation?: string;
    syncVariantWith?: TokenId; // if set, this token's variant changes in sync with the referenced token. NOT the same as a reference, syncs e.g sibh with leibh, thu with leat
}

export interface TokenRefPart {
    kind: "token_ref";
    ref: TokenId;
}

export interface TokenFeatures {
    gender?: "masculine" | "feminine"; // for mutation rules
    register?: "formal" | "informal";
    conceptTags?: string[];
}

export interface Variant {
    id: string;
    text: string;
    transforms?: Transform[]; // e.g. variant also lenites in context
    features?: Partial<TokenFeatures>;
    tips?: TipRef[];
    translation?: string;
}

export interface Transform {
    type: "lenition";
    becomes: string; // e.g. "mhath"
    when?: {
        variantPresent?: string; // only apply if a specific variant is chosen
        featureEquals?: { [featureName: string]: string }; // only apply if token has a specific feature value
    };
    causeId?: TokenId; // optional link to the token that causes this transform
    reason?: string;
}

export interface TipRef {
    tipId: keyof typeof globalTips;
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
}

export interface Tip {
    id: string;
    title: string;
    body: string;
    policy?: { show: "once" | "always" };
}

export interface ShowUtteranceDisplayEvent {
    type: "show_utterance";
    utteranceId: UtteranceId;
}

export interface ShowTipDisplayEvent {
    type: "show_tip";
    tipId: string;
    tokenId?: TokenId;
    side?: Side;
}

export type DisplayEvent = ShowUtteranceDisplayEvent | ShowTipDisplayEvent;
