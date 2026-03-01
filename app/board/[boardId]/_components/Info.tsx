"use client";

import { useQuery } from "convex/react";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Actions } from "@/components/Actions";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

interface Props {
  boardId: Id<"boards">;
}

const Separator = () => {
  return (
    <p className="flex items-center text-muted-foreground font-bold select-none">
      |
    </p>
  );
};

const Info = ({ boardId }: Props) => {
  const data = useQuery(api.board.get, { id: boardId });

  if (!data) return <Info.Skeleton />;

  return (
    <aside className="absolute z-10 group top-2 left-2 bg-white shadow-2xl p-2 px-2.5 rounded-sm shadow-black flex items-center justify-center">
      <button type="button">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.svg" width={40} height={40} alt="company logo" />
          boardy
        </Link>
      </button>
      <Separator />
      {data.title}
      <Separator />
      <Actions id={boardId}>
        <button
          className="group cursor-pointer rounded-lg border border-gray-800 select-none focus-visible:outline-1 focus-visible:outline-[#4a90e2]"
          type="button"
        >
          <MoreHorizontal className="group-hover:opacity-50 duration-300" />
        </button>
      </Actions>
    </aside>
  );
};

Info.Skeleton = () => {
  return (
    <Skeleton className="absolute top-2 left-2 shadow-2xl p-1.5 rounded-sm shadow-black bg-white h-9 w-40" />
  );
};

export default Info;
