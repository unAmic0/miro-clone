import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { z } from "zod";
import { safeString, safeId } from "@/utils/validators";

export const get = query({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

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

export const remove = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    await ctx.db.delete(id);

    const boardInFavorites = await ctx.db
      .query("favoriteBoards")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", identity.subject).eq("boardId", id),
      )
      .unique();

    if (boardInFavorites) await ctx.db.delete(boardInFavorites._id);
  },
});

export const rename = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, { id, title }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    try {
      z.object({
        id: safeId,
        title: safeString,
      }).parse({ id, title });
      return await ctx.db.patch(id, { title });
    } catch {
      throw new Error("the title contains prohibited characters");
    }
  },
});

export const favorite = mutation({
  args: {
    boardId: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, { boardId, orgId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    // TODO: check for the security
    const alreadyIncluded = await ctx.db
      .query("favoriteBoards")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", boardId),
      )
      .unique();

    if (alreadyIncluded) throw new Error("Board already added to favorites");

    const board = await ctx.db.get(boardId);
    if (!board) throw new Error("Board not found");

    await ctx.db.insert("favoriteBoards", {
      boardId: board._id,
      orgId: orgId,
      userId,
    });
    // TODO: check
    return;
  },
});

export const unfavorite = mutation({
  args: {
    boardId: v.id("boards"),
  },
  handler: async (ctx, { boardId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db
      .query("favoriteBoards")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", identity.subject).eq("boardId", boardId),
      )
      .unique();

    if (!board) throw new Error("Board doen't added in favorites");

    await ctx.db.delete(board._id);

    return;
  },
});
