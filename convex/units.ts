import { v } from "convex/values";

import { mutation, query } from "@/convex/server";
import { buildPracticeQueue, getUnitPracticeState } from "@/lib/util/practice";
import { getStreakGoal, getUpdatedStreakState } from "@/lib/util/streak";

import { getCurrentUserOrThrow } from "./lib/auth";

export const getCompletedUnitIds = query({
    handler: async (ctx) => {
        const user = await getCurrentUserOrThrow(ctx);

        const completions = await ctx.db
            .query("unitCompletions")
            .withIndex("userId_unitId", (q) => q.eq("userId", user._id))
            .collect();

        return completions.map((c) => c.unitId);
    },
});

export const getPracticeQueue = query({
    handler: async (ctx) => {
        const user = await getCurrentUserOrThrow(ctx);

        const practiceStates = await ctx.db
            .query("unitPracticeStates")
            .withIndex("userId_unitId", (q) => q.eq("userId", user._id))
            .collect();

        return buildPracticeQueue(practiceStates, Date.now());
    },
});

export const getHomeProgress = query({
    handler: async (ctx) => {
        const user = await getCurrentUserOrThrow(ctx);

        const completions = await ctx.db
            .query("unitCompletions")
            .withIndex("userId_unitId", (q) => q.eq("userId", user._id))
            .collect();

        return {
            completedUnitIds: completions.map(
                (completion) => completion.unitId,
            ),
            currentStreak: user.currentStreak ?? 0,
            streakGoal: getStreakGoal(user.currentStreak ?? 0),
        };
    },
});

export const upsertCompletion = mutation({
    args: {
        unitId: v.string(),
        correctAnswers: v.number(),
        questionCount: v.number(),
    },
    handler: async (ctx, args) => {
        const user = await getCurrentUserOrThrow(ctx);
        const now = Date.now();

        const existingCompletion = await ctx.db
            .query("unitCompletions")
            .withIndex("userId_unitId", (q) =>
                q.eq("userId", user._id).eq("unitId", args.unitId),
            )
            .unique();
        const existingPracticeState = await ctx.db
            .query("unitPracticeStates")
            .withIndex("userId_unitId", (q) =>
                q.eq("userId", user._id).eq("unitId", args.unitId),
            )
            .unique();

        const completion = {
            userId: user._id,
            unitId: args.unitId,
            correctAnswers: args.correctAnswers,
            questionCount: args.questionCount,
            completedAt: now,
        };

        if (existingCompletion) {
            await ctx.db.patch(existingCompletion._id, completion);
        } else {
            await ctx.db.insert("unitCompletions", completion);
        }

        const percentageCorrect = Math.round(
            (args.correctAnswers / args.questionCount) * 100,
        );

        const reviewedPracticeState = getUnitPracticeState(
            existingPracticeState ?? undefined,
            percentageCorrect,
            new Date(now),
        );

        const practiceState = {
            userId: user._id,
            unitId: args.unitId,
            ...reviewedPracticeState.practiceState,
        };

        if (existingPracticeState) {
            await ctx.db.patch(existingPracticeState._id, practiceState);
        } else {
            await ctx.db.insert("unitPracticeStates", practiceState);
        }

        await ctx.db.patch(
            user._id,
            getUpdatedStreakState(
                {
                    currentStreak: user.currentStreak,
                    lastActiveAt: user.lastActiveAt,
                },
                now,
            ),
        );
    },
});
