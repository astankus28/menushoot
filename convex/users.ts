import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getOrCreate = mutation({
  args: { clerkId: v.string(), email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    if (existing) return existing._id;
    const now = Date.now();
    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      credits: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const listOrders = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    if (!user) return [];
    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(20);
  },
});

export const getCredits = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    return user?.credits ?? 0;
  },
});

export const addCredits = mutation({
  args: {
    clerkId: v.string(),
    credits: v.number(),
    productId: v.string(),
    stripeSessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    if (!user) {
      const now = Date.now();
      const id = await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: undefined,
        credits: 0,
        createdAt: now,
        updatedAt: now,
      });
      user = (await ctx.db.get(id))!;
    }
    const newCredits = user.credits + args.credits;
    await ctx.db.patch(user._id, { credits: newCredits, updatedAt: Date.now() });
    await ctx.db.insert("orders", {
      userId: user._id,
      productId: args.productId,
      credits: args.credits,
      amount: 0,
      status: "completed",
      stripeSessionId: args.stripeSessionId,
      createdAt: Date.now(),
    });
    return newCredits;
  },
});

export const deductCredit = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    if (!user) throw new Error("User not found");
    if (user.credits < 1) throw new Error("Insufficient credits");
    await ctx.db.patch(user._id, {
      credits: user.credits - 1,
      updatedAt: Date.now(),
    });
    return user.credits - 1;
  },
});
