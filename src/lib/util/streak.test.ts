import { describe, expect, test } from "bun:test";

import { getStreakGoal, getUpdatedStreakState } from "@/lib/util/streak";

describe("getStreakGoal", () => {
    test("uses the early milestone ladder", () => {
        expect(getStreakGoal(0)).toBe(7);
        expect(getStreakGoal(6)).toBe(7);
        expect(getStreakGoal(7)).toBe(14);
        expect(getStreakGoal(29)).toBe(30);
        expect(getStreakGoal(99)).toBe(100);
    });

    test("keeps increasing forever in 50-day bands after 100", () => {
        expect(getStreakGoal(100)).toBe(150);
        expect(getStreakGoal(149)).toBe(150);
        expect(getStreakGoal(150)).toBe(200);
        expect(getStreakGoal(237)).toBe(250);
    });
});

describe("getUpdatedStreakState", () => {
    test("sets the first-ever completion streak to 1", () => {
        const now = new Date("2026-04-09T12:00:00.000Z");

        expect(
            getUpdatedStreakState({}, now),
        ).toEqual({
            currentStreak: 1,
            lastActiveAt: now.getTime(),
        });
    });

    test("does not increase the streak for another completion on the same day", () => {
        const now = new Date("2026-04-09T18:00:00.000Z");

        expect(
            getUpdatedStreakState(
                {
                    currentStreak: 3,
                    lastActiveAt: new Date("2026-04-09T09:00:00.000Z").getTime(),
                },
                now,
            ),
        ).toEqual({
            currentStreak: 3,
            lastActiveAt: now.getTime(),
        });
    });

    test("increments the streak when the previous active day was yesterday", () => {
        const now = new Date("2026-04-09T12:00:00.000Z");

        expect(
            getUpdatedStreakState(
                {
                    currentStreak: 3,
                    lastActiveAt: new Date("2026-04-08T12:00:00.000Z").getTime(),
                },
                now,
            ),
        ).toEqual({
            currentStreak: 4,
            lastActiveAt: now.getTime(),
        });
    });

    test("resets the streak to 1 after a gap of more than one day", () => {
        const now = new Date("2026-04-09T12:00:00.000Z");

        expect(
            getUpdatedStreakState(
                {
                    currentStreak: 5,
                    lastActiveAt: new Date("2026-04-06T12:00:00.000Z").getTime(),
                },
                now,
            ),
        ).toEqual({
            currentStreak: 1,
            lastActiveAt: now.getTime(),
        });
    });

    test("defaults safely when the last active timestamp falls on today but the streak is missing", () => {
        const now = new Date("2026-04-09T12:00:00.000Z");

        expect(
            getUpdatedStreakState(
                {
                    lastActiveAt: new Date("2026-04-09T09:00:00.000Z").getTime(),
                },
                now,
            ),
        ).toEqual({
            currentStreak: 1,
            lastActiveAt: now.getTime(),
        });
    });
});
