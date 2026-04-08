import { GenericQuizOption } from "@/components/GenericQuiz";
import {
    Conversation,
    TokenOverrideMap,
    TokenPart,
    Utterance,
} from "@/lib/language/convos/types";
import { shuffleArray } from "@/lib/util/array";
import { compareAlphabetically } from "@/lib/util/sort";

export interface SubstitutionQuizOption extends GenericQuizOption {
    value: string;
    overrides: TokenOverrideMap;
}

export interface SubstitutionQuizQuestion {
    promptUtterance: Utterance;
    correctOption: SubstitutionQuizOption;
    options: SubstitutionQuizOption[];
}

function buildTokenMap(convo: Conversation) {
    const tokenMap = new Map<string, TokenPart>();

    for (const utterance of convo.utterances) {
        for (const part of utterance.parts) {
            if (part.kind === "token") {
                tokenMap.set(part.id, part);
            }
        }
    }

    return tokenMap;
}

export function formatUtteranceWithOverrides(
    utterance: Utterance,
    overrides: TokenOverrideMap,
    tokenMap: ReturnType<typeof buildTokenMap>,
) {
    let final = "";

    for (const part of utterance.parts) {
        if (part.kind === "text" || part.kind === "punct") {
            final += part.text;
            continue;
        }

        const token = part.kind === "token_ref" ? tokenMap.get(part.ref) : part;

        if (!token) {
            final += part.kind === "token_ref" ? part.ref : part.id;
            continue;
        }

        const currentVariantId = overrides[token.id] ?? token.id;
        const currentVariant = token.variants?.find(
            (variant) => variant.id === currentVariantId,
        );

        final += currentVariant?.text ?? token.base;
    }

    return final;
}

export function buildSubstitutionQuizQuestions(
    convo: Conversation,
): SubstitutionQuizQuestion[] {
    const tokenMap = buildTokenMap(convo);
    const eligible = convo.utterances
        .filter((utterance) => utterance.substitutionQuestion)
        .sort((a, b) => compareAlphabetically(a.id, b.id));

    return eligible.map((utterance) => {
        const correctOption: SubstitutionQuizOption = {
            id: utterance.id,
            isCorrect: true,
            overrides: utterance.substitutionQuestion!.correctOverrides,
            value: formatUtteranceWithOverrides(
                utterance,
                utterance.substitutionQuestion!.correctOverrides,
                tokenMap,
            ),
        };

        return {
            promptUtterance: utterance,
            correctOption,
            options: shuffleArray([
                correctOption,
                ...utterance.substitutionQuestion!.incorrectOverrides.map(
                    (overrides, idx) => ({
                        id: `${utterance.id}-${idx}`,
                        isCorrect: false,
                        overrides,
                        value: formatUtteranceWithOverrides(
                            utterance,
                            overrides,
                            tokenMap,
                        ),
                    }),
                ),
            ]),
        };
    });
}
