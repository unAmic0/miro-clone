"use client";

import { useSelf, useStorage } from "@liveblocks/react/suspense";
import { cn } from "@/lib/utils";
import { type Camera, CanvasMode } from "@/types/canvas";
import { useCanvas } from "../../CanvasContext";
import ChangeColor from "./ChangeColor";
import DeleteLayer from "./DeleteLayer";
import { getToolsPlacement, TOOLS_HEIGHT } from "./getToolsPlacement";

interface Props {
  camera: Camera;
}

/**
 * Tools attached to the selected layer (like the context toolbar in Miro).
 *
 * It is an HTML overlay and not a Konva node on purpose:
 * - it keeps the same size and sharp text whatever the zoom is
 * - mouse events on it never reach the stage, so clicking it doesn't reset the selection
 * - real buttons / inputs can be put in it later
 *
 * It has to be rendered inside a `relative` container with the same origin as the stage.
 */
const SelectionTools = ({ camera }: Props) => {
  const { canvasState } = useCanvas();

  // same rule as in OwnSelection: the tools belong to the first selected layer.
  // Narrow selectors, so we don't re-render on every cursor move
  const selectedLayerId = useSelf((me) => me.presence.selection[0]);
  const selection = useSelf((me) => me.presence.selection);
  const selectedLayer = useStorage((storage) =>
    selectedLayerId ? storage.layers[selectedLayerId] : undefined,
  );

  if (!selectedLayer) return null;

  // while resizing, the frame is changing under the pointer, and while inserting
  // a new layer the panel could swallow the mouse down that starts it
  if (
    canvasState.mode !== CanvasMode.None &&
    canvasState.mode !== CanvasMode.Selecting
  ) {
    return null;
  }

  const { x, y, side } = getToolsPlacement(selectedLayer, camera);

  return (
    // z-5: above the canvas, but below the rest of the UI (toolbar, board info, etc.)
    <div
      className="absolute top-0 left-0 z-5"
      // rounded to avoid blurry text on fractional pixels
      style={{ transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)` }}
    >
      <div
        role="toolbar"
        aria-label="Layer tools"
        style={{ height: TOOLS_HEIGHT }}
        className={cn(
          "flex -translate-x-1/2 select-none items-center gap-0.5 whitespace-nowrap rounded-sm bg-white px-1.5 text-sm shadow-2xl shadow-black",
          side === "top" && "-translate-y-full",
        )}
      >
        <ChangeColor layerId={selectedLayer.id} fill={selectedLayer.fill} />
        <span aria-hidden className="mx-0.5 h-4 w-px bg-neutral-200" />
        <DeleteLayer layerIds={selection} />
      </div>
    </div>
  );
};

export default SelectionTools;
