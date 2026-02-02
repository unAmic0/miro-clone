"use client";

import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Actions } from "@/components/Actions";
import { Skeleton } from "@/components/ui/skeleton";
import type { Id } from "@/convex/_generated/dataModel";
import { Footer } from "./Footer";
import { Overlay } from "./Overlay";

interface Props {
  title: string;
  imgUrl: string;
  id: Id<"boards">;
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
      <Actions id={id}>
        <MoreHorizontal className="absolute right-5 top-4 opacity-0 group-hover:opacity-100 text-white hover:text-gray-300 duration-300" />
      </Actions>
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
    <Skeleton className="size-full aspect-100/127 border rounded-2xl border-transparent" />
  );
};
