import { ResizeSide } from "@/types/canvas";
import type { Vector2d } from "konva/lib/types";

const MINI_SQUARE_SIZE = 8;
const HALF_MINI_SQUARE_SIZE = MINI_SQUARE_SIZE / 2;

/**
 * returns style for cusor, based of the angle of the miniSquare's position
 * @param center - center of the selected layer
 * @param squarePos - position of the mini square
 */
export const getCursorFromAngle = (center: Vector2d, squarePos: Vector2d) => {
  const dx = squarePos.x - center.x;
  const dy = squarePos.y - center.y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI); // -180 to 180

  if (angle >= -22.5 && angle < 22.5) return "e-resize";
  if (angle >= 22.5 && angle < 67.5) return "se-resize";
  if (angle >= 67.5 && angle < 112.5) return "s-resize";
  if (angle >= 112.5 && angle < 157.5) return "sw-resize";
  if (angle >= 157.5 || angle < -157.5) return "w-resize";
  if (angle >= -157.5 && angle < -112.5) return "nw-resize";
  if (angle >= -112.5 && angle < -67.5) return "n-resize";
  if (angle >= -67.5 && angle < -22.5) return "ne-resize";

  return "e-resize"; // fallback
};

export const getResizeDirection = (row: number, col: number) => {
  let resizeDirection = 0;
  if (row === 0) resizeDirection |= ResizeSide.Top;
  if (row === 2) resizeDirection |= ResizeSide.Bottom;
  if (col === 0) resizeDirection |= ResizeSide.Left;
  if (col === 2) resizeDirection |= ResizeSide.Right;
  return resizeDirection;
};

export const getMiniSquarePos = (
  index: number,
  position: number,
  bound: number,
) => {
  if (index === 0) return position - HALF_MINI_SQUARE_SIZE;
  else if (index === 1) return position + bound / 2 - HALF_MINI_SQUARE_SIZE;
  else if (index === 2) return position + bound - HALF_MINI_SQUARE_SIZE;
  return;
};

export const getMiniSquares = ({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  const selectedLayerCenter = { x: x + width / 2, y: y + height / 2 };
  const miniSquares = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (row === 1 && col === 1) {
        continue;
      }

      const miniSquarePos = {
        x: getMiniSquarePos(col, x, width),
        y: getMiniSquarePos(row, y, height),
      };
      if (miniSquarePos.x && miniSquarePos.y) {
        miniSquares.push({
          ...miniSquarePos,
          width: MINI_SQUARE_SIZE,
          height: MINI_SQUARE_SIZE,
          resizeDirection: getResizeDirection(row, col),
          pointer: getCursorFromAngle(
            selectedLayerCenter,
            // using the 'as' keyword because of the if condition above
            miniSquarePos as Vector2d,
          ),
        });
      }
    }
  }

  return miniSquares;
};
