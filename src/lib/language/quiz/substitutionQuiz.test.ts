import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import { greeting } from "@/lib/language/convos/data/greeting";
import { buildSubstitutionQuizQuestions } from "@/lib/language/quiz/substitutionQuiz";

const originalRandom = Math.random;

beforeEach(() => {
    Math.random = () => 0;
});

afterEach(() => {
    Math.random = originalRandom;
});

describe("buildSubstitutionQuizQuestions", () => {
    test("builds questions only for utterances with authored substitution data", () => {
        const questions = buildSubstitutionQuizQuestions(greeting);

        expect(questions).toHaveLength(1);
        expect(questions[0]!.promptUtterance.id).toBe("greeting.u2");
    });

    test("uses the authored correct overrides for the correct option text", () => {
        const questions = buildSubstitutionQuizQuestions(greeting);
        const question = questions[0]!;

        expect(question.correctOption.value).toBe(
            "Tha mi gu math, tapadh leibh. Ciamar a tha sibh?",
        );
    });

    test("uses the authored incorrect overrides for the incorrect option texts", () => {
        const questions = buildSubstitutionQuizQuestions(greeting);
        const question = questions[0]!;

        expect(
            question.options
                .filter((option) => !option.isCorrect)
                .map((option) => option.value)
                .sort(),
        ).toEqual([
            "Tha mi gu math, tapadh leat. Ciamar a tha sibh?",
            "Tha mi gu math, tapadh leibh. Ciamar a tha thu?",
        ]);
    });

    test("supports synced substitutions when multiple token overrides are authored together", () => {
        const questions = buildSubstitutionQuizQuestions(greeting);
        const question = questions[0]!;

        expect(question.correctOption.overrides).toEqual({
            "greeting.you": "greeting.you.informal",
            "greeting.tyou": "greeting.tyou.formal",
        });
        expect(question.correctOption.value).toContain("leibh");
        expect(question.correctOption.value).toContain("sibh");
    });

    test("shuffles options without changing membership", () => {
        const questions = buildSubstitutionQuizQuestions(greeting);
        const question = questions[0]!;

        expect(question.options.map((option) => option.id)).not.toEqual([
            "greeting.u2",
            "greeting.u2-0",
            "greeting.u2-1",
        ]);
        expect(new Set(question.options.map((option) => option.id))).toEqual(
            new Set(["greeting.u2", "greeting.u2-0", "greeting.u2-1"]),
        );
    });
});
