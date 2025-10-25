"use client";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { Overlay } from "./Overlay";
import { Footer } from "./Footer";
import { Actions } from "./Actions";

interface Props {
  title: string;
  imgUrl: string;
  id: string;
  creationTime: number;
  authorId: string;
  authoutName: string;
  isFavorite?: true;
}

export const BoardCard = ({
  imgUrl,
  title,
  id,
  creationTime,
  authorId,
  authoutName,
  isFavorite,
}: Props) => {
  const { userId } = useAuth();

  const authourLabel = authorId === userId ? "You" : authoutName;
  const createAtLabel = formatDistanceToNow(creationTime, { addSuffix: true });

  return (
    <div className="border relative rounded-2xl border-transparent aspect-[100/127] group flex flex-col shadow-lg">
      <div className="relative rounded-t-2xl flex-1 bg-[#fefbeb] flex">
        <Image fill src={imgUrl} alt="title" className="p-2" />
        <Overlay id={id} />
      </div>

      <Actions id={id} />
      <Footer
        title={title}
        authourLabel={authourLabel}
        createdAtLabel={createAtLabel}
        isFavorite={isFavorite}
        boardId={id}
      />
    </div>
  );
};

BoardCard.Skeleton = () => {
  return (
    <Skeleton className="size-full aspect-[100/127] border rounded-2xl border-transparent" />
  );
};
