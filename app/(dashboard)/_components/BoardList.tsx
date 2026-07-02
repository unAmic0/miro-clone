"use client";

import { useSearchParams } from "next/navigation";
import { EmptyState } from "./EmptyState";
import { EmptyBoards } from "./EmptyBoards";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { BoardCard } from "./BoardCard";
import { NewBoardButton } from "./NewBoardButton";

export const BoardList = () => {
  const { organization } = useOrganization();

  const searchParams = useSearchParams();
  const isFavorites = !!searchParams.get("favorites");
  const search = searchParams.get("search");

  const data = useQuery(api.boards.get, {
    orgId: organization!.id,
    favorites: isFavorites,
    ...(search != null && { search }),
  });

  if (!data)
    return (
      <div className="m-8">
        <h2 className="text-4xl mb-5">Team boards</h2>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <NewBoardButton disabled orgId={organization!.id} />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );

  if (!data.length && searchParams.get("search"))
    return (
      <EmptyState
        img="/empty-search.svg"
        title="No results found"
        text="Try searching for smth else"
      />
    );

  if (!data.length && isFavorites)
    return (
      <EmptyState
        img="/empty-favorites.svg"
        title="No favorites"
        text="Try favoriting a board"
      />
    );

  if (!data.length) return <EmptyBoards />;

  return (
    <div className="m-8">
      <h2 className="text-4xl mb-5">
        {isFavorites ? "Favorite" : "Team"} boards
      </h2>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <NewBoardButton orgId={organization!.id} />
        {data.map(
          ({
            imageUrl,
            title,
            _id,
            _creationTime,
            authorId,
            authorName,
            isFavorite,
          }) => (
            <BoardCard
              // TODO : fix
              isFavorite={isFavorite}
              imgUrl={imageUrl}
              title={title}
              key={`board ${_id}`}
              id={_id}
              creationTime={_creationTime}
              authorId={authorId}
              authoutName={authorName}
            />
          ),
        )}
      </div>
    </div>
  );
};
