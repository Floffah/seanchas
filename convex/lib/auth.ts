import { getAuthUserId } from "@convex-dev/auth/server";

import { QueryCtx } from "@/convex/server";

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
    const userRecord = await getCurrentUser(ctx);
    if (!userRecord) throw new Error("Can't get current user");
    return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
        return null;
    }
    return await ctx.db.get(userId);
}
