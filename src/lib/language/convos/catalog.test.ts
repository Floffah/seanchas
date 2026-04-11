import { describe, expect, test } from "bun:test";

import { conversations } from "@/lib/language/convos";
import { buildResponseQuizQuestions } from "@/lib/language/quiz/responseQuiz";
import { buildSubstitutionQuizQuestions } from "@/lib/language/quiz/substitutionQuiz";
import { buildSummaryQuizQuestions } from "@/lib/language/quiz/summaryQuiz";
import { buildTranslationQuizQuestions } from "@/lib/language/quiz/translationQuiz";

const SLUG_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe("conversations catalog", () => {
    test("uses unique slug-safe conversation ids", () => {
        const conversationIds = conversations.map((conversation) => conversation.id);

        expect(new Set(conversationIds).size).toBe(conversationIds.length);

        for (const conversationId of conversationIds) {
            expect(conversationId).toMatch(SLUG_ID_PATTERN);
        }
    });

    test("keeps each authored conversation valid for the current unit flow", () => {
        for (const conversation of conversations) {
            const utteranceIds = conversation.utterances.map(
                (utterance) => utterance.id,
            );
            const tokenMap = new Map(
                conversation.utterances.flatMap((utterance) =>
                    utterance.parts.flatMap((part) =>
                        part.kind === "token" ? [[part.id, part] as const] : [],
                    ),
                ),
            );

            expect(new Set(utteranceIds).size).toBe(utteranceIds.length);
            expect(buildSummaryQuizQuestions(conversation).length).toBeGreaterThan(0);
            expect(
                buildTranslationQuizQuestions(conversation).length,
            ).toBeGreaterThan(0);
            expect(buildResponseQuizQuestions(conversation).length).toBeGreaterThan(
                0,
            );
            expect(
                buildSubstitutionQuizQuestions(conversation).length,
            ).toBeGreaterThan(0);

            for (const utterance of conversation.utterances) {
                for (const part of utterance.parts) {
                    if (part.kind === "token_ref") {
                        expect(tokenMap.has(part.ref)).toBe(true);
                    }
                }

                for (const responseId of utterance.incorrectResponseIds ?? []) {
                    expect(utteranceIds).toContain(responseId);
                }

                if (!utterance.substitutionQuestion) {
                    continue;
                }

                const overrideSets = [
                    utterance.substitutionQuestion.correctOverrides,
                    ...utterance.substitutionQuestion.incorrectOverrides,
                ];

                for (const overrides of overrideSets) {
                    for (const [tokenId, variantId] of Object.entries(overrides)) {
                        const token = tokenMap.get(tokenId);

                        expect(token).toBeDefined();
                        expect([
                            token?.id,
                            ...(token?.variants?.map((variant) => variant.id) ??
                                []),
                        ]).toContain(variantId);
                    }
                }
            }
        }
    });
});
