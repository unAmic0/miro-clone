"use client";

import { shallow, useMutation, useStorage } from "@liveblocks/react/suspense";
import { LayersArrowUp, LayersArrowDown } from "lucide-react";
import type { ReactNode } from "react";
import { Hint } from "@/_components/Hint";
import {
  canMove,
  type LayerDirection,
  moveInStack,
  sortByZIndex,
} from "@/lib/layerOrder";

interface Props {
  /** every layer of the current selection */
  layerIds: string[];
}

/**
 * Send to back / bring to front, like the arrows of Miro's context toolbar.
 *
 * The stack is stored in `zIndex` and not in the order of the `layers` map: a
 * `LiveMap` doesn't promise that its keys come back in the same order on every
 * client, so two users would see different overlaps.
 */
const LayerOrder = ({ layerIds }: Props) => {
  const moveLayers = useMutation(
    ({ storage }, ids: string[], direction: LayerDirection) => {
      const layers = storage.get("layers");
      const order = sortByZIndex(
        [...layers.entries()].map(([id, layer]) => ({
          id,
          zIndex: layer.get("zIndex"),
        })),
      ).map((layer) => layer.id);

      const moved = moveInStack(order, ids, direction);

      // all the writes belong to one mutation, so the other clients never see a
      // half-applied stack. Only the layers that really changed place are touched
      moved.forEach((id, zIndex) => {
        const layer = layers.get(id);
        if (layer && layer.get("zIndex") !== zIndex) {
          layer.set("zIndex", zIndex);
        }
      });
    },
    [],
  );

  // the same order the mutation works on, so a button is never greyed out while
  // it would still move something
  const [canGoFront, canGoBack] = useStorage((storage) => {
    const order = sortByZIndex(Object.values(storage.layers)).map(
      (layer) => layer.id,
    );

    return [
      canMove(order, layerIds, "front"),
      canMove(order, layerIds, "back"),
    ];
  }, shallow);

  return (
    <>
      <MoveButton
        label="send to back"
        ariaLabel="Send layer to back"
        disabled={!canGoBack}
        onClick={() => moveLayers(layerIds, "back")}
      >
        <LayersArrowDown className="size-4" />
      </MoveButton>
      <MoveButton
        label="bring to front"
        ariaLabel="Bring layer to front"
        disabled={!canGoFront}
        onClick={() => moveLayers(layerIds, "front")}
      >
        <LayersArrowUp className="size-4" />
      </MoveButton>
    </>
  );
};

interface MoveButtonProps {
  /** the tooltip text, phrased like the other tools of the panel */
  label: string;
  ariaLabel: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}

/** Same box and hover as the tools around it, so the panel stays one row. */
const MoveButton = ({
  label,
  ariaLabel,
  disabled,
  onClick,
  children,
}: MoveButtonProps) => (
  <Hint label={label} side="top">
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className="flex size-7 items-center justify-center rounded-md text-neutral-600 duration-300 hover:bg-[#f1f5fb] disabled:text-gray-500 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  </Hint>
);

export default LayerOrder;
