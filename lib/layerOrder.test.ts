import { describe, expect, it } from "@jest/globals";
import { canMove, moveInStack, sortByZIndex } from "./layerOrder";

const stack = ["bottom", "middle", "top"];

describe("sortByZIndex", () => {
  it("puts the biggest index last, because that layer is painted on top", () => {
    const layers = [
      { id: "c", zIndex: 2 },
      { id: "a", zIndex: 0 },
      { id: "b", zIndex: 1 },
    ];

    expect(sortByZIndex(layers).map((layer) => layer.id)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("keeps the storage order for layers created before zIndex existed", () => {
    // `undefined` has to fall back to 0 without shaking the stack up
    const layers = [
      { id: "old-1", zIndex: undefined as unknown as number },
      { id: "old-2", zIndex: undefined as unknown as number },
      { id: "new", zIndex: 1 },
    ];

    expect(sortByZIndex(layers).map((layer) => layer.id)).toEqual([
      "old-1",
      "old-2",
      "new",
    ]);
  });

  it("doesn't mutate the array it gets", () => {
    const layers = [
      { id: "top", zIndex: 1 },
      { id: "bottom", zIndex: 0 },
    ];

    sortByZIndex(layers);

    expect(layers.map((layer) => layer.id)).toEqual(["top", "bottom"]);
  });
});

describe("moveInStack", () => {
  it("takes a layer all the way to the front", () => {
    expect(moveInStack(stack, ["bottom"], "front")).toEqual([
      "middle",
      "top",
      "bottom",
    ]);
  });

  it("takes a layer all the way to the back", () => {
    expect(moveInStack(stack, ["top"], "back")).toEqual([
      "top",
      "bottom",
      "middle",
    ]);
  });

  it("jumps over every layer in between, not just one", () => {
    const order = ["a", "b", "c", "d", "e"];

    expect(moveInStack(order, ["a"], "front")).toEqual([
      "b",
      "c",
      "d",
      "e",
      "a",
    ]);
    expect(moveInStack(order, ["e"], "back")).toEqual([
      "e",
      "a",
      "b",
      "c",
      "d",
    ]);
  });

  it("keeps the layer already at that end in place", () => {
    expect(moveInStack(stack, ["top"], "front")).toEqual(stack);
    expect(moveInStack(stack, ["bottom"], "back")).toEqual(stack);
  });

  it("moves a selected block as one piece, in its own order", () => {
    const order = ["a", "b", "c", "d"];

    expect(moveInStack(order, ["b", "d"], "front")).toEqual([
      "a",
      "c",
      "b",
      "d",
    ]);
    expect(moveInStack(order, ["d", "b"], "front")).toEqual([
      "a",
      "c",
      "b",
      "d",
    ]);
    expect(moveInStack(order, ["c", "b"], "back")).toEqual([
      "b",
      "c",
      "a",
      "d",
    ]);
  });

  it("leaves the layers that aren't selected in their own order", () => {
    expect(moveInStack(["a", "b", "c", "d"], ["c"], "back")).toEqual([
      "c",
      "a",
      "b",
      "d",
    ]);
  });

  it("ignores ids that aren't in the stack anymore", () => {
    expect(moveInStack(stack, ["deleted"], "front")).toEqual(stack);
  });

  it("doesn't mutate the order it gets", () => {
    moveInStack(stack, ["middle"], "front");

    expect(stack).toEqual(["bottom", "middle", "top"]);
  });
});

describe("canMove", () => {
  it("is true while the selection isn't at that end yet", () => {
    expect(canMove(stack, ["middle"], "front")).toBe(true);
    expect(canMove(stack, ["middle"], "back")).toBe(true);
  });

  it("is false when the selection is already at that end", () => {
    expect(canMove(stack, ["top"], "front")).toBe(false);
    expect(canMove(stack, ["bottom"], "back")).toBe(false);
  });

  it("is false for an empty selection", () => {
    expect(canMove(stack, [], "front")).toBe(false);
  });
});
