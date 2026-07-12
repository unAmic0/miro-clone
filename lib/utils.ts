import type { TLayer } from "@/types/canvas";
import { type ClassValue, clsx } from "clsx";
import type { Vector2d } from "konva/lib/types";
import { twMerge } from "tailwind-merge";
import { ResizeSide } from "@/types/canvas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Return updated layer
 * @param resizeMask - a mask compatible with the {@link ResizeSide} enum
 * @param layer - layer that has to be changed
 * @param absolutePointerPos - the pointer position in world's coordinates
 * @returns the updated layer
 */
export function resizeLayer(
  resizeMask: number,
  layer: TLayer,
  absolutePointerPos: Vector2d,
): TLayer {
  const newLayer = { ...layer };

  // y coordinate
  if (resizeMask & ResizeSide.Top) {
    newLayer.height += newLayer.position.y - absolutePointerPos.y;
    newLayer.position.y = absolutePointerPos.y;
  }
  if (resizeMask & ResizeSide.Bottom) {
    newLayer.height = absolutePointerPos.y - newLayer.position.y;
  }

  // x coordinate
  if (resizeMask & ResizeSide.Left) {
    newLayer.width += newLayer.position.x - absolutePointerPos.x;
    newLayer.position.x = absolutePointerPos.x;
  }
  if (resizeMask & ResizeSide.Right) {
    newLayer.width = absolutePointerPos.x - newLayer.position.x;
  }
  return newLayer;
}
