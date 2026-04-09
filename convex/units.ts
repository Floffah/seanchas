import { v } from "convex/values";

import { mutation, query } from "@/convex/server";

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

export const upsertCompletion = mutation({
    args: {
        unitId: v.string(),
        correctAnswers: v.number(),
        questionCount: v.number(),
    },
    handler: async (ctx, args) => {
        const user = await getCurrentUserOrThrow(ctx);

        const existingCompletion = await ctx.db
            .query("unitCompletions")
            .withIndex("userId_unitId", (q) =>
                q.eq("userId", user._id).eq("unitId", args.unitId),
            )
            .unique();

        const completion = {
            userId: user._id,
            unitId: args.unitId,
            correctAnswers: args.correctAnswers,
            questionCount: args.questionCount,
            completedAt: Date.now(),
        };

        if (existingCompletion) {
            await ctx.db.patch(existingCompletion._id, completion);
            return existingCompletion._id;
        }

        return await ctx.db.insert("unitCompletions", completion);
    },
});
