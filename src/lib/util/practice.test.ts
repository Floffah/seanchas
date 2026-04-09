import { describe, expect, test } from "bun:test";
import { Rating, State } from "ts-fsrs";

import { gamesAndCoffee } from "@/lib/language/convos/data/gamesAndCoffee";
import { greeting } from "@/lib/language/convos/data/greeting";
import { introductions } from "@/lib/language/convos/data/introductions";
import {
    buildPracticeQueue,
    deserializeFsrsCard,
    getUnitPracticeState,
    percentageCorrectToRating,
    serializeFsrsCard,
} from "@/lib/util/practice";

describe("percentageCorrectToRating", () => {
    test("maps percentage bands to the expected FSRS ratings", () => {
        expect(percentageCorrectToRating(0)).toBe(Rating.Again);
        expect(percentageCorrectToRating(39)).toBe(Rating.Again);
        expect(percentageCorrectToRating(40)).toBe(Rating.Hard);
        expect(percentageCorrectToRating(69)).toBe(Rating.Hard);
        expect(percentageCorrectToRating(70)).toBe(Rating.Good);
        expect(percentageCorrectToRating(89)).toBe(Rating.Good);
        expect(percentageCorrectToRating(90)).toBe(Rating.Easy);
        expect(percentageCorrectToRating(100)).toBe(Rating.Easy);
    });
});

describe("getUnitPracticeState", () => {
    test("creates a persisted practice state from the first unit review", () => {
        const now = new Date("2026-04-09T12:00:00.000Z");
        const review = getUnitPracticeState(undefined, 78, now);

        expect(review.rating).toBe(Rating.Good);
        expect(review.practiceState.reps).toBe(1);
        expect(review.practiceState.lapses).toBe(0);
        expect(review.practiceState.state).toBe(State.Review);
        expect(review.practiceState.lastReview).toBe(now.getTime());
        expect(review.practiceState.updatedAt).toBe(now.getTime());
        expect(review.practiceState.due).toBeGreaterThan(now.getTime());
    });

    test("round-trips a persisted practice state through deserialize and serialize before the next review", () => {
        const firstReviewAt = new Date("2026-04-09T12:00:00.000Z");
        const firstReview = getUnitPracticeState(undefined, 95, firstReviewAt);
        const card = deserializeFsrsCard({
            unitId: "greeting",
            ...firstReview.practiceState,
        });
        const serializedCard = serializeFsrsCard(
            card,
            Rating.Easy,
            firstReviewAt.getTime(),
        );

        expect(serializedCard).toMatchObject(firstReview.practiceState);

        const secondReviewAt = new Date("2026-04-17T12:00:00.000Z");
        const secondReview = getUnitPracticeState(
            {
                unitId: "greeting",
                ...firstReview.practiceState,
            },
            78,
            secondReviewAt,
        );

        expect(secondReview.rating).toBe(Rating.Good);
        expect(secondReview.practiceState.reps).toBe(2);
        expect(secondReview.practiceState.lastReview).toBe(
            secondReviewAt.getTime(),
        );
        expect(secondReview.practiceState.updatedAt).toBe(
            secondReviewAt.getTime(),
        );
    });
});

describe("buildPracticeQueue", () => {
    test("orders units as due, then new in authored order, then later by due date", () => {
        const now = new Date("2026-04-09T12:00:00.000Z").getTime();

        expect(
            buildPracticeQueue(
                [
                    {
                        unitId: greeting.id,
                        due: now - 1_000,
                        lastRating: Rating.Hard,
                    },
                    {
                        unitId: gamesAndCoffee.id,
                        due: now + 86_400_000,
                        lastRating: Rating.Good,
                    },
                ],
                now,
            ),
        ).toEqual([
            {
                unitId: greeting.id,
                due: now - 1_000,
                lastRating: Rating.Hard,
                status: "due",
            },
            {
                unitId: introductions.id,
                status: "new",
            },
            {
                unitId: gamesAndCoffee.id,
                due: now + 86_400_000,
                lastRating: Rating.Good,
                status: "later",
            },
        ]);
    });
});
