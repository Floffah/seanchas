import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const upsertCompletion = mutation({
    args: {
        unitId: v.string(),
        correctAnswers: v.number(),
        questionCount: v.number(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            throw new Error("Not authenticated");
        }

        const existingCompletion = await ctx.db
            .query("unitCompletions")
            .withIndex("userId_unitId", (q) =>
                q.eq("userId", userId).eq("unitId", args.unitId),
            )
            .unique();

        const completion = {
            userId,
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
