import { describe, expect, test } from "@jest/globals";
import { isSameColor, PRESET_COLORS, toHexColor } from "./colors";

describe("toHexColor", () => {
  test("expands the short form", () => {
    expect(toHexColor("#fff")).toBe("#ffffff");
  });

  test("accepts a lowercase and an uppercase hex", () => {
    expect(toHexColor("#023E8A")).toBe("#023e8a");
    expect(toHexColor("  #023e8a  ")).toBe("#023e8a");
  });

  test("accepts a named color", () => {
    expect(toHexColor("red")).toBe("#ff0000");
  });

  test("returns null for something that is not a color", () => {
    expect(toHexColor("not a color")).toBeNull();
    expect(toHexColor("")).toBeNull();
  });
});

describe("isSameColor", () => {
  test("matches a name and the equivalent hex", () => {
    expect(isSameColor("red", "#ff0000")).toBe(true);
  });

  test("is case and short-form insensitive", () => {
    expect(isSameColor("#FFF", "#ffffff")).toBe(true);
  });

  test("separates two different colors", () => {
    expect(isSameColor("#e63946", "#48cae4")).toBe(false);
  });

  test("falls back to a plain comparison when a value isn't a color", () => {
    expect(isSameColor("garbage", "garbage")).toBe(true);
    expect(isSameColor("garbage", "red")).toBe(false);
  });
});

describe("preset palette", () => {
  test("only holds colors the picker can round-trip", () => {
    for (const color of PRESET_COLORS) {
      expect(toHexColor(color)).toBe(color);
    }
  });

  test("has no duplicates, or two swatches would light up at once", () => {
    expect(new Set(PRESET_COLORS).size).toBe(PRESET_COLORS.length);
  });
});
