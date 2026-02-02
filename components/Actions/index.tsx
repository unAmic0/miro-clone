"use client";

import { Link, Pencil, Trash2 } from "lucide-react";
import { type ReactNode, useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "@/_components/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import type { Id } from "@/convex/_generated/dataModel";
import { RenameModal } from "./RenameModal";

interface Props {
  id: Id<"boards">;
  children: ReactNode;
}

export const Actions = ({ id, children }: Props) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(`${location.href}/board/${id}`)
      .then(() => toast.success("successfully copied"))
      .catch(() => toast.error("smth went wrong"));
  };
  const [deleteMutation] = useApiMutation(api.board.remove);
  const handleDelete = () => {
    deleteMutation({ id })
      .then(() => toast.success("deleted successfully"))
      .catch(() => toast.error("smth went wrong"));
  };

  const [openRename, setOpenRename] = useState(false);

  return (
    <Dialog open={openRename} onOpenChange={setOpenRename}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onSelect={handleCopy}>
            <Link />
            Copy link
          </DropdownMenuItem>
          {/* if add "asChild" - after closing the dialog the site will freeze */}
          <DialogTrigger className="w-full">
            <DropdownMenuItem className="">
              <Pencil />
              Rename
            </DropdownMenuItem>
          </DialogTrigger>
          <ConfirmModal
            header="Are you sure ?"
            description="You're gonna delete the board"
            handleConfirm={handleDelete}
          >
            <Button
              variant="ghost"
              className="w-full py-1.5 px-2! flex justify-start"
            >
              <Trash2 className="text-red-600" />
              Delete
            </Button>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
      <RenameModal id={id} setOpen={setOpenRename} />
    </Dialog>
  );
};
