import { ResizeSide, CanvasLayer, type TLayer } from "@/types/canvas";
import { describe, expect, it } from "@jest/globals";
import { resizeLayer } from "./utils";

describe("layer resizing", () => {
  const createLayer = (overrides?: Partial<TLayer>): TLayer => ({
    id: "random id",
    layerType: CanvasLayer.Rectangle,
    position: { x: 100, y: 100 },
    width: 200,
    height: 200,
    fill: "blue",
    ...overrides,
  });

  it.each([
    [
      "Right Edge",
      {
        direction: ResizeSide.Right,
        pointer: { x: 350, y: 100 },
        expected: { x: 100, y: 100, w: 250, h: 200 },
      },
    ],

    [
      "Bottom Edge",
      {
        direction: ResizeSide.Bottom,
        pointer: { x: 100, y: 350 },
        expected: { x: 100, y: 100, w: 200, h: 250 },
      },
    ],

    [
      "Top-Left Corner",
      {
        direction: ResizeSide.Top | ResizeSide.Left,
        pointer: { x: 50, y: 50 },
        expected: { x: 50, y: 50, w: 250, h: 250 },
      },
    ],
    [
      "no direction",
      {
        direction: 0,
        pointer: { x: 50, y: 50 },
        expected: { x: 100, y: 100, w: 200, h: 200 },
      },
    ],
  ])(
    "should resize correctly for %s",
    (_, { direction, pointer, expected }) => {
      const result = resizeLayer(direction, createLayer(), pointer);

      expect(result.position).toEqual({ x: expected.x, y: expected.y });
      expect(result.width).toBe(expected.w);
      expect(result.height).toBe(expected.h);
    },
  );
});
