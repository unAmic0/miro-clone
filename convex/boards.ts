import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    orgId: v.string(),
    favorites: v.optional(v.boolean()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, { orgId, favorites, search }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    if (favorites) {
      const favoriteBoards = await ctx.db
        .query("favoriteBoards")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", userId).eq("orgId", orgId),
        )
        .order("desc")
        .collect();

      const favoriteBoardsIds = favoriteBoards.map(
        (favoriteBoard) => favoriteBoard.boardId,
      );

      const boards = await getAllOrThrow(ctx.db, favoriteBoardsIds);
      return boards.map((board) => ({ ...board, isFavorite: true }) as const);
    }
    if (search) {
      const boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("orgId", orgId),
        )
        .collect();

      return boards;
    }

    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .order("desc")
      .collect();
    const boardsWithFavoriteRelations = await Promise.all(
      boards.map(async (board) => {
        const boardInFavorites = await ctx.db
          .query("favoriteBoards")
          .withIndex("by_user_board", (q) =>
            q.eq("userId", userId).eq("boardId", board._id),
          )
          .unique();

        return { ...board, isFavorite: !!boardInFavorites };
      }),
    );

    return boardsWithFavoriteRelations;
  },
});
