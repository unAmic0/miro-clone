import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Overlay } from "./Overlay.tsx";
import { Footer } from "./Footer.tsx";

interface Props {
	title: string;
	imgUrl: string;
	id: string;
	creationTime: number;
	authorId: string;
	authoutName: string;
}

export const BoardCard = ({
	imgUrl,
	title,
	id,
	creationTime,
	authorId,
	authoutName,
}: Props) => {
	const { userId } = useAuth();

	const authourLabel = authorId === userId ? "You" : authoutName;
	const createAtLabel = formatDistanceToNow(creationTime, { addSuffix: true });

	return (
		<Link
			href={`/board/${id}`}
			className="border rounded-2xl border-transparent aspect-[100/127] group flex flex-col"
		>
			<div className="relative rounded-t-2xl flex-1 bg-[#fefbeb] flex">
				<Image fill src={imgUrl} alt="title" className="p-2" />
				<Overlay />
			</div>
			<Footer
				title={title}
				authourLabel={authourLabel}
				createdAtLabel={createAtLabel}
			/>
		</Link>
	);
};

BoardCard.Skeleton = () => {
	return (
		<Skeleton className="size-full aspect-[100/127] border rounded-2xl border-transparent" />
	);
};
