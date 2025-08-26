"use client";

import { useSearchParams } from "next/navigation";
import { EmptyState } from "./EmptyState";
import { EmptyBoards } from "./EmptyBoards";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { BoardCard } from "./BoardCard";
import { NewBoardButton } from "./NewBoardButton.tsx";

export const BoardList = () => {
	const searchParams = useSearchParams();
	const { organization } = useOrganization();

	const data = useQuery(api.boards.get, { orgId: organization!.id });

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

	if (!data.length && searchParams.get("favorites"))
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
			<h2 className="text-4xl mb-5">Team boards</h2>
			<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				<NewBoardButton orgId={organization!.id} />
				{data.map(
					({ imageUrl, title, _id, _creationTime, authorId, authorName }) => (
						<BoardCard
							imgUrl={imageUrl}
							title={title}
							key={_creationTime}
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
