import type { TLayer } from "@/types/canvas";

/**
 * Which end of the stack a move goes to. "front" is the top of the canvas
 * (painted last), "back" is the background.
 */
export type LayerDirection = "front" | "back";

/**
 * Sorts layers so that index 0 is the bottom one — the order Konva paints its
 * children in, which is the order `<CanvasLayer>` is rendered in.
 *
 * The sort has to stay stable: layers created before `zIndex` existed don't
 * have one, and they must keep the order they are stored in instead of jumping
 * to the bottom of the stack.
 */
export const sortByZIndex = <T extends Pick<TLayer, "zIndex">>(
  layers: T[],
): T[] => [...layers].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));

/**
 * Moves the selection to the very front or the very back of the stack.
 *
 * The layers inside the selection keep their order relative to each other — the
 * block travels as one piece and is never reversed — and so do the layers left
 * behind. Nothing else is reshuffled.
 *
 * @param order - every layer id, bottom first
 * @param selection - ids to move; ids that aren't in `order` are ignored
 * @returns a new order — the input is not mutated, so it can be compared with it
 */
export const moveInStack = (
  order: string[],
  selection: string[],
  direction: LayerDirection,
): string[] => {
  const selected = new Set(selection);
  const moved = order.filter((id) => selected.has(id));
  const rest = order.filter((id) => !selected.has(id));

  return direction === "front" ? [...rest, ...moved] : [...moved, ...rest];
};

/**
 * Whether {@link moveInStack} would change anything. Used to grey out the
 * buttons when the selection already sits at that end of the stack.
 */
export const canMove = (
  order: string[],
  selection: string[],
  direction: LayerDirection,
): boolean =>
  moveInStack(order, selection, direction).some((id, i) => id !== order[i]);
