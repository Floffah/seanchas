import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        currentStreak: v.optional(v.number()),
        lastActiveAt: v.optional(v.number()),
    }).index("by_tokenIdentifier", ["tokenIdentifier"]),

    unitCompletions: defineTable({
        userId: v.id("users"),
        unitId: v.string(),
        correctAnswers: v.number(),
        questionCount: v.number(),
        completedAt: v.number(),
    }).index("userId_unitId", ["userId", "unitId"]),

    unitPracticeStates: defineTable({
        userId: v.id("users"),
        unitId: v.string(),
        due: v.number(),
        stability: v.number(),
        difficulty: v.number(),
        elapsedDays: v.number(),
        scheduledDays: v.number(),
        reps: v.number(),
        lapses: v.number(),
        state: v.number(),
        lastReview: v.optional(v.number()),
        lastRating: v.optional(v.number()),
        updatedAt: v.number(),
    }).index("userId_unitId", ["userId", "unitId"]),
});

export default schema;
