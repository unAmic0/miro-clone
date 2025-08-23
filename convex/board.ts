import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = Array.from(
  { length: 9 },
  (_, i) => `/placeholders/${i + 1}.svg`,
);

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, { title, orgId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const board = await ctx.db.insert("boards", {
      title,
      orgId,
      authorId: identity.subject,
      authorName: identity.name || "unnamed",
      imageUrl: randomImage,
    });
    return board;
  },
});
