import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.optional(v.string()),
    credits: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  orders: defineTable({
    userId: v.id("users"),
    stripeSessionId: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
    productId: v.string(),
    credits: v.number(),
    amount: v.number(),
    status: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  images: defineTable({
    userId: v.id("users"),
    publicId: v.string(),
    url: v.string(),
    style: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
