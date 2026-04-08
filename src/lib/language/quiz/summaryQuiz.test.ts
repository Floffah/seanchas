import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import { greeting } from "@/lib/language/convos/data/greeting";
import { buildSummaryQuizQuestions } from "@/lib/language/quiz/summaryQuiz";

const originalRandom = Math.random;

beforeEach(() => {
    Math.random = () => 0;
});

afterEach(() => {
    Math.random = originalRandom;
});

describe("buildSummaryQuizQuestions", () => {
    test("builds quiz questions from authored summary questions", () => {
        const questions = buildSummaryQuizQuestions(greeting);

        expect(questions).toHaveLength(1);
        expect(questions.map((question) => question.prompt)).toEqual([
            "What was the conversation about?",
        ]);
    });

    test("includes the correct and incorrect answers for each question", () => {
        const questions = buildSummaryQuizQuestions(greeting);
        const question = questions[0]!;

        expect(question.correctOption.value).toBe(
            "Greeting someone and asking how they are.",
        );
        expect(question.options.map((option) => option.value).sort()).toEqual([
            "Buying food at a market.",
            "Greeting someone and asking how they are.",
            "Talking about the weather forecast.",
        ]);
    });

    test("shuffles options without changing membership", () => {
        const questions = buildSummaryQuizQuestions(greeting);
        const question = questions[0]!;

        expect(question.options.map((option) => option.id)).not.toEqual([
            "summary-0-correct",
            "summary-0-0",
            "summary-0-1",
        ]);
        expect(new Set(question.options.map((option) => option.id))).toEqual(
            new Set(["summary-0-correct", "summary-0-0", "summary-0-1"]),
        );
    });
});
