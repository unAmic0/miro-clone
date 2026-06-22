import { describe, test, expect, it } from "@jest/globals";
import {
  getMiniSquarePos,
  getMiniSquares,
  getResizeDirection,
  getCursorFromAngle,
} from "./getMiniSquares";
import { ResizeSide } from "@/types/canvas";

describe("cursor's style", () => {
  it.each([
    [
      "bottom-right corner",
      {
        center: { x: 50, y: 50 },
        squarePos: { x: 1000, y: 1000 },
        expected: "se-resize",
      },
    ],
    [
      "bottom edge",
      {
        center: { x: -100, y: -100 },
        squarePos: { x: -80, y: 0 },
        expected: "s-resize",
      },
    ],
    [
      "top-left edge",
      {
        center: { x: 0, y: 0 },
        squarePos: { x: -70, y: 70 },
        expected: "sw-resize",
      },
    ],
  ])("sould be %s", (_, { center, squarePos, expected }) => {
    const cursor = getCursorFromAngle(center, squarePos);
    expect(cursor).toBe(expected);
  });
});

describe("mini squares in the own selection", () => {
  test("mini squares positions", () => {
    expect(getMiniSquarePos(0, 100, 100)).toBe(96);
    expect(getMiniSquarePos(1, 100, 100)).toBe(146);
    expect(getMiniSquarePos(2, 100, 100)).toBe(196);
    expect(getMiniSquarePos(3, 100, 100)).toBeUndefined();
  });
  test("mini squares resize direction", () => {
    expect(getResizeDirection(0, 0)).toBe(ResizeSide.Top | ResizeSide.Left);
    expect(getResizeDirection(2, 2)).toBe(ResizeSide.Bottom | ResizeSide.Right);
    expect(getResizeDirection(1, 1)).toBe(0);
    expect(getResizeDirection(-10, 10)).toBe(0);
  });
  test("get mini squares", () => {
    const commonMiniSquares = getMiniSquares({
      x: 100,
      y: 100,
      width: 100,
      height: 100,
    });
    expect(commonMiniSquares).toMatchSnapshot();
    const negativeMiniSquares = getMiniSquares({
      x: -100,
      y: -100,
      width: -100,
      height: -100,
    });
    expect(negativeMiniSquares).toMatchSnapshot();
  });
});
