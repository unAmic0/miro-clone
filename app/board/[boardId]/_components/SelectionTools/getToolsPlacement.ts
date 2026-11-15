import type { Camera, TLayer } from "@/types/canvas";
import { MINI_SQUARE_SIZE } from "../OwnSelected/getMiniSquares";

/** Height of the tools panel in screen pixels. Must match the panel's `h-*` class. */
export const TOOLS_HEIGHT = 40;

/** Free space between the selection handles and the tools panel, in screen pixels. */
export const TOOLS_GAP = 8;

// The resize handles stick out of the selection frame by half of their size
// plus half of the frame's stroke (2). They live in the world's coordinates,
// so on screen this distance scales with the zoom.
const HANDLE_OVERHANG = MINI_SQUARE_SIZE / 2 + 1;

export type ToolsPlacement = {
  /** Horizontal center of the panel, in screen pixels (relative to the stage) */
  x: number;
  /** The edge of the panel that touches the anchor, in screen pixels (relative to the stage) */
  y: number;
  /** Which edge of the selected layer the panel is attached to */
  side: "top" | "bottom";
};

/**
 * Bounding box of a layer in the world's coordinates.
 *
 * A layer's width and height can be negative (the layer was drawn towards the
 * top-left), so the box has to be normalized.
 *
 * This is the same box the selection frame is drawn with (see OwnSelection),
 * so the tools always stay attached to the frame.
 */
export const getLayerBounds = ({
  position,
  width,
  height,
}: Pick<TLayer, "position" | "width" | "height">) => ({
  left: Math.min(position.x, position.x + width),
  right: Math.max(position.x, position.x + width),
  top: Math.min(position.y, position.y + height),
  bottom: Math.max(position.y, position.y + height),
});

/**
 * Where to put the tools panel for the selected layer.
 *
 * The panel is centered above the layer. If there is no room above (the layer
 * is at the top of the viewport), it is put below the layer instead.
 *
 * The result is in screen pixels relative to the stage, so the panel keeps
 * its size whatever the zoom is.
 */
export const getToolsPlacement = (
  layer: Pick<TLayer, "position" | "width" | "height">,
  camera: Camera,
): ToolsPlacement => {
  const { left, right, top, bottom } = getLayerBounds(layer);
  const overhang = HANDLE_OVERHANG * camera.zoom;

  const x = ((left + right) / 2) * camera.zoom + camera.x;
  const topEdge = top * camera.zoom + camera.y - overhang;
  const bottomEdge = bottom * camera.zoom + camera.y + overhang;

  const fitsAbove = topEdge - TOOLS_GAP - TOOLS_HEIGHT >= 0;

  return fitsAbove
    ? { x, y: topEdge - TOOLS_GAP, side: "top" }
    : { x, y: bottomEdge + TOOLS_GAP, side: "bottom" };
};
