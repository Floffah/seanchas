import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import { greeting } from "@/lib/language/convos/data/greeting";
import { Conversation, ConversationSpeaker } from "@/lib/language/convos/types";
import { buildTranslationQuizQuestions } from "@/lib/language/quiz/translationQuiz";

const originalRandom = Math.random;

beforeEach(() => {
    Math.random = () => 0;
});

afterEach(() => {
    Math.random = originalRandom;
});

describe("buildTranslationQuizQuestions", () => {
    test("builds a question for each utterance with authored incorrect translations", () => {
        const questions = buildTranslationQuizQuestions(greeting);

        expect(questions).toHaveLength(3);
        expect(questions.map((question) => question.utterance.id)).toEqual([
            "greeting.u0",
            "greeting.u1",
            "greeting.u2",
        ]);
    });

    test("excludes utterances without incorrect translations", () => {
        const questions = buildTranslationQuizQuestions(greeting);

        expect(
            questions.some(
                (question) => question.utterance.id === "greeting.u3",
            ),
        ).toBe(false);
    });

    test("sorts eligible utterances alphabetically by id before building questions", () => {
        const conversation: Conversation = {
            id: "custom",
            name: "Custom",
            utterances: [
                {
                    id: "custom.u10",
                    speaker: ConversationSpeaker.A,
                    translationFormat: "Ten",
                    incorrectTranslations: ["Wrong ten"],
                    parts: [{ kind: "text", text: "Ten" }],
                },
                {
                    id: "custom.u2",
                    speaker: ConversationSpeaker.B,
                    translationFormat: "Two",
                    incorrectTranslations: ["Wrong two"],
                    parts: [{ kind: "text", text: "Two" }],
                },
                {
                    id: "custom.u1",
                    speaker: ConversationSpeaker.A,
                    translationFormat: "One",
                    incorrectTranslations: ["Wrong one"],
                    parts: [{ kind: "text", text: "One" }],
                },
            ],
        };

        const questions = buildTranslationQuizQuestions(conversation);

        expect(questions.map((question) => question.utterance.id)).toEqual([
            "custom.u1",
            "custom.u10",
            "custom.u2",
        ]);
    });

    test("uses the utterance translationFormat as the correct option and authored translations as distractors", () => {
        const questions = buildTranslationQuizQuestions(greeting);
        const question = questions.find(
            (candidate) => candidate.utterance.id === "greeting.u0",
        )!;

        const correctOption = question.options.find(
            (option) => option.isCorrect,
        )!;
        const incorrectValues = question.options
            .filter((option) => !option.isCorrect)
            .map((option) => option.value)
            .sort();

        expect(correctOption.id).toBe("greeting.u0");
        expect(correctOption.value).toBe(
            "$greeting.math$ $greeting.daySegment$!",
        );
        expect(incorrectValues).toEqual(["Good day!", "Hello!"]);
    });

    test("shuffles options without changing membership", () => {
        const questions = buildTranslationQuizQuestions(greeting);
        const question = questions.find(
            (candidate) => candidate.utterance.id === "greeting.u0",
        )!;

        expect(question.options.map((option) => option.id)).not.toEqual([
            "greeting.u0",
            "greeting.u0-0",
            "greeting.u0-1",
        ]);
        expect(new Set(question.options.map((option) => option.id))).toEqual(
            new Set(["greeting.u0", "greeting.u0-0", "greeting.u0-1"]),
        );
    });
});
