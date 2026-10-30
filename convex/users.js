import { mutation, query } from "./_generated/server";

export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        if (!identity.email) {
            throw new Error(
                "Email Missing From Clerk Identity. Check Clerk Session Token Claims.",
            );
        }

        const tokenIdentifier = identity.tokenIdentifier;

        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", tokenIdentifier),
            )
            .unique();

        const userData = {
            name: identity.name ?? "Anonymous",
            email: identity.email,
            ...(identity.pictureUrl ? { imageUrl: identity.pictureUrl } : {}),
        };

        if (existingUser) {
            await ctx.db.patch(existingUser._id, {
                ...userData,
                lastActiveAt: Date.now(),
            });

            return existingUser._id;
        }

        return await ctx.db.insert("users", {
            ...userData,
            tokenIdentifier,
            plan: "free",
            projectsUsed: 0,
            exportsThisMonth: 0,
            createdAt: Date.now(),
            lastActiveAt: Date.now(),
        });
    },
});

export const getCurrentUser = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not Authenticated");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier),
            )
            .unique();

        if (!user) {
            throw new Error("User Not Found");
        }

        return user;
    },
});
