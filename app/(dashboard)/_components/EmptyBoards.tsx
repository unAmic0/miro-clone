"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";

export const EmptyBoards = () => {
  const [create, pending] = useApiMutation(api.board.create);
  const { organization } = useOrganization();

  const onClick = () => {
    if (!organization) return;

    create({
      title: "some board",
      orgId: organization.id,
    })
      .then(() => toast.success("a board created"))
      .catch(() => toast.error("something went wrong"));
  };

  return (
    <div className="flex flex-col gap-y-3 size-full justify-center items-center">
      <Image
        width={220}
        height={220}
        className="select-none"
        draggable={false}
        alt="Empty"
        src="/note.svg"
      />
      <h1 className="text-4xl font-semibold">Create your first board</h1>
      <p className="text-muted-foreground text-xl">
        Start by creating a board for your organization
      </p>
      <Button onClick={onClick} className="text-xl py-6 px-8">
        Create a board
      </Button>
    </div>
  );
};
