import { describe, expect, test } from "bun:test";

import { calculateUnitCompletion } from "@/lib/util/units";

describe("calculateUnitCompletion", () => {
    test("aggregates correct answers and question counts across all scored steps", () => {
        expect(
            calculateUnitCompletion({
                summaryQuiz: {
                    correctCount: 1,
                    questionCount: 1,
                },
                translationQuiz: {
                    correctCount: 2,
                    questionCount: 3,
                },
                responseQuiz: {
                    correctCount: 3,
                    questionCount: 3,
                },
                substitutionQuiz: {
                    correctCount: 1,
                    questionCount: 2,
                },
            }),
        ).toEqual({
            correctAnswers: 7,
            questionCount: 9,
            percentageCorrect: 78,
        });
    });

    test("returns zero percent when no scored steps have been recorded yet", () => {
        expect(calculateUnitCompletion({})).toEqual({
            correctAnswers: 0,
            questionCount: 0,
            percentageCorrect: 0,
        });
    });
});
