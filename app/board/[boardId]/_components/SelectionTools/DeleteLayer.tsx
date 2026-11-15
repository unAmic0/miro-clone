"use client";

import { useMutation } from "@liveblocks/react/suspense";
import { Trash2 } from "lucide-react";
import { Hint } from "@/_components/Hint";

interface Props {
  /** every layer of the current selection */
  layerIds: string[];
}

const DeleteLayer = ({ layerIds }: Props) => {
  const deleteLayers = useMutation(
    ({ storage, setMyPresence, self }, ids: string[]) => {
      const layers = storage.get("layers");

      for (const id of ids) {
        layers.delete(id);
      }

      // drop the deleted ids from my selection — filtering rather than clearing,
      // because `ids` is whatever the caller deleted, not necessarily everything selected
      setMyPresence({
        selection: self.presence.selection.filter((id) => !ids.includes(id)),
      });
    },
    [],
  );

  return (
    <Hint label="delete" side="top">
      <button
        type="button"
        aria-label="Delete layer"
        disabled={layerIds.length === 0}
        onClick={() => deleteLayers(layerIds)}
        className="flex size-7 items-center justify-center rounded-md text-neutral-600 duration-300 hover:bg-[#ffe8e8] hover:text-[#e63946] disabled:text-gray-500"
      >
        <Trash2 className="size-4" />
      </button>
    </Hint>
  );
};

export default DeleteLayer;
