import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save a transformed image record (called after Cloudinary upload)
export const save = mutation({
  args: {
    clerkId: v.string(),
    publicId: v.string(),
    url: v.string(),
    style: v.string(),
    variationLabel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    if (!user) throw new Error("User not found");

    return await ctx.db.insert("images", {
      userId: user._id,
      publicId: args.publicId,
      url: args.url,
      style: args.style,
      variationLabel: args.variationLabel,
      createdAt: Date.now(),
    });
  },
});

// Get all transformed images for the current user (for a future gallery)
export const listByUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    if (!user) return [];

    return await ctx.db
      .query("images")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(50);
  },
});
