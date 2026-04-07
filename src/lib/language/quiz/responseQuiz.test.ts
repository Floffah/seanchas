import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import { greeting } from "@/lib/language/convos/data/greeting";
import { Conversation, ConversationSpeaker } from "@/lib/language/convos/types";
import { buildResponseQuizQuestions } from "@/lib/language/quiz/responseQuiz";

const originalRandom = Math.random;

beforeEach(() => {
    Math.random = () => 0;
});

afterEach(() => {
    Math.random = originalRandom;
});

function createConversationWithUtteranceCount(count: number): Conversation {
    return {
        id: `generated-${count}`,
        name: "Generated",
        utterances: Array.from({ length: count }, (_, idx) => {
            const incorrectResponseIds = Array.from(
                { length: count },
                (_, j) => `u${j}`,
            )
                .filter((id) => id !== `u${idx}` && id !== `u${idx + 1}`)
                .slice(0, 2);

            return {
                id: `u${idx}`,
                speaker:
                    idx % 2 === 0
                        ? ConversationSpeaker.A
                        : ConversationSpeaker.B,
                translationFormat: `Utterance ${idx}`,
                incorrectResponseIds:
                    idx < count - 1 ? incorrectResponseIds : undefined,
                parts: [{ kind: "text" as const, text: `Utterance ${idx}` }],
            };
        }),
    };
}

describe("buildResponseQuizQuestions", () => {
    test("uses the next utterance as the correct response with authored distractors", () => {
        const questions = buildResponseQuizQuestions(greeting);
        const question = questions.find(
            (candidate) => candidate.promptUtterance.id === "greeting.u0",
        )!;

        expect(question.correctResponse.id).toBe("greeting.u1");
        expect(question.options.map((option) => option.id).sort()).toEqual([
            "greeting.u1",
            "greeting.u2",
            "greeting.u3",
        ]);
    });

    test("excludes prompts without a next utterance", () => {
        const questions = buildResponseQuizQuestions(greeting);

        expect(
            questions.some(
                (question) => question.promptUtterance.id === "greeting.u3",
            ),
        ).toBe(false);
    });

    test("excludes prompts with missing or invalid authored distractors", () => {
        const conversation: Conversation = {
            ...greeting,
            utterances: greeting.utterances.map((utterance) =>
                utterance.id === "greeting.u0"
                    ? {
                          ...utterance,
                          incorrectResponseIds: ["greeting.u3", "missing.id"],
                      }
                    : utterance,
            ),
        };

        const questions = buildResponseQuizQuestions(conversation);

        expect(
            questions.some(
                (question) => question.promptUtterance.id === "greeting.u0",
            ),
        ).toBe(false);
    });

    test("applies the clamped 1/3 subset size capped by eligibility", () => {
        const conversation = createConversationWithUtteranceCount(18);
        const questions = buildResponseQuizQuestions(conversation);

        expect(questions).toHaveLength(5);
    });

    test("shuffles options without changing membership", () => {
        const questions = buildResponseQuizQuestions(greeting);
        const question = questions.find(
            (candidate) => candidate.promptUtterance.id === "greeting.u0",
        )!;

        expect(question.options.map((option) => option.id)).not.toEqual([
            "greeting.u1",
            "greeting.u2",
            "greeting.u3",
        ]);
        expect(new Set(question.options.map((option) => option.id))).toEqual(
            new Set(["greeting.u1", "greeting.u2", "greeting.u3"]),
        );
    });
});
