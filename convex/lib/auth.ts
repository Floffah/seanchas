import { MutationCtx, QueryCtx } from "@/convex/server";

export async function getCurrentUser(ctx: QueryCtx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", (q) =>
            q.eq("tokenIdentifier", identity.tokenIdentifier),
        )
        .unique();
}

export async function getOrCreateCurrentUser(ctx: MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", (q) =>
            q.eq("tokenIdentifier", identity.tokenIdentifier),
        )
        .unique();
    if (existing) return existing;

    const userId = await ctx.db.insert("users", {
        tokenIdentifier: identity.tokenIdentifier,
    });
    return (await ctx.db.get(userId))!;
}
