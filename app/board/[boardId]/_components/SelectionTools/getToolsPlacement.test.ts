import { describe, expect, it, test } from "@jest/globals";
import {
  getLayerBounds,
  getToolsPlacement,
  TOOLS_GAP,
  TOOLS_HEIGHT,
} from "./getToolsPlacement";

const noCamera = { x: 0, y: 0, zoom: 1 };

// the resize handles stick out of the frame by 5 world units (4 of the handle + 1 of the stroke)
const OVERHANG = 5;

describe("layer bounds", () => {
  test("layer drawn towards the bottom-right", () => {
    expect(
      getLayerBounds({ position: { x: 10, y: 20 }, width: 30, height: 40 }),
    ).toEqual({ left: 10, right: 40, top: 20, bottom: 60 });
  });

  test("layer drawn towards the top-left (negative width and height)", () => {
    expect(
      getLayerBounds({ position: { x: 40, y: 60 }, width: -30, height: -40 }),
    ).toEqual({ left: 10, right: 40, top: 20, bottom: 60 });
  });

  test("layer without size", () => {
    expect(
      getLayerBounds({ position: { x: 5, y: 5 }, width: 0, height: 0 }),
    ).toEqual({ left: 5, right: 5, top: 5, bottom: 5 });
  });
});

describe("tools placement", () => {
  const layer = { position: { x: 100, y: 200 }, width: 100, height: 50 };

  test("is centered above the layer, clear of the handles", () => {
    expect(getToolsPlacement(layer, noCamera)).toEqual({
      x: 150,
      y: 200 - OVERHANG - TOOLS_GAP,
      side: "top",
    });
  });

  test("does not depend on the direction the layer was drawn in", () => {
    const flipped = {
      position: { x: 200, y: 250 },
      width: -100,
      height: -50,
    };
    expect(getToolsPlacement(flipped, noCamera)).toEqual(
      getToolsPlacement(layer, noCamera),
    );
  });

  test("follows the camera's pan and zoom", () => {
    // screen = world * zoom + camera
    expect(getToolsPlacement(layer, { x: 30, y: 40, zoom: 2 })).toEqual({
      x: 150 * 2 + 30,
      y: 200 * 2 + 40 - OVERHANG * 2 - TOOLS_GAP,
      side: "top",
    });
  });

  test("keeps the gap in screen pixels whatever the zoom is", () => {
    // the handles scale with the zoom, the gap does not
    const zoomedOut = getToolsPlacement(layer, { x: 0, y: 0, zoom: 0.5 });
    expect(zoomedOut.y).toBe(200 * 0.5 - OVERHANG * 0.5 - TOOLS_GAP);
  });

  it.each([
    ["has exactly enough room", 53, "top"],
    ["is a pixel short of room", 52, "bottom"],
    ["is at the very top", 0, "bottom"],
    ["is above the viewport", -500, "bottom"],
  ] as const)("layer that %s", (_, y, side) => {
    // topEdge = y - OVERHANG; it fits when topEdge - GAP - HEIGHT >= 0, so y >= 53
    expect(TOOLS_GAP + TOOLS_HEIGHT + OVERHANG).toBe(53);
    const placement = getToolsPlacement(
      { position: { x: 0, y }, width: 10, height: 10 },
      noCamera,
    );
    expect(placement.side).toBe(side);
  });

  test("below the layer: attached to its bottom edge", () => {
    expect(
      getToolsPlacement(
        { position: { x: 100, y: 20 }, width: 100, height: 50 },
        noCamera,
      ),
    ).toEqual({ x: 150, y: 70 + OVERHANG + TOOLS_GAP, side: "bottom" });
  });

  test("a layer panned out of the viewport still gets finite coordinates", () => {
    const { x, y } = getToolsPlacement(layer, { x: -5000, y: -5000, zoom: 3 });
    expect(Number.isFinite(x)).toBe(true);
    expect(Number.isFinite(y)).toBe(true);
  });
});
