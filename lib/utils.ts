import { type ClassValue, clsx } from "clsx";
import type { KonvaEventObject } from "konva/lib/Node";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sets the cursor style on the Konva stage container.
 * @param e - Konva mouse event
 * @param cursor - CSS cursor value
 */
export function setCursor(e: KonvaEventObject<MouseEvent>, cursor: string) {
  const container = e.target.getStage()?.container();
  if (container) container.style.cursor = cursor;
}
