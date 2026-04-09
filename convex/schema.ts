import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    users: defineTable({
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        email: v.optional(v.string()),
        emailVerificationTime: v.optional(v.number()),
        phone: v.optional(v.string()),
        phoneVerificationTime: v.optional(v.number()),
        isAnonymous: v.optional(v.boolean()),

        // non convex user fields
        currentStreak: v.optional(v.number()),
        lastActiveAt: v.optional(v.number()),
    }).index("email", ["email"]),

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
