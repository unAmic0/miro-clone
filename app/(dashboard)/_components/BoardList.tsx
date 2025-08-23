import { useSearchParams } from "next/navigation";
import { EmptyState } from "./EmptyState";
import { EmptyBoards } from "./EmptyBoards";

export const BoardList = () => {
	const searchParams = useSearchParams();
	const data = [];

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

	return <button>hi</button>;
};
