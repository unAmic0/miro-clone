import { TinyColor } from "@ctrl/tinycolor";

/**
 * Swatches offered in the layer color tool.
 *
 * The far end of the range is the same blue the selection frame uses (#023e8a),
 * so a recolored layer doesn't clash with its own selection.
 */
export const PRESET_COLORS = [
  "#ffffff",
  "#d9d9d9",
  "#8f8f8f",
  "#2b2b2b",
  "#023e8a",
  "#465879",
  "#48cae4",
  "#52b788",
  "#f9c74f",
  "#f9844a",
  "#e63946",
  "#d8b4f8",
] as const;

/**
 * Canonical `#rrggbb` for any color tinycolor understands (`red`, `#fff`,
 * `hsl(0 0% 0%)`, ...).
 *
 * @returns the hex string, or `null` when the value isn't a color. The picker's
 * text input refuses anything else instead of writing garbage into storage.
 */
export const toHexColor = (value: string): string | null => {
  const color = new TinyColor(value.trim());
  return color.isValid ? color.toHexString().toLowerCase() : null;
};

/**
 * Whether two colors describe the same visible color, so `red` and `#ff0000`
 * both light up the same swatch.
 */
export const isSameColor = (a: string, b: string): boolean => {
  const first = new TinyColor(a);
  const second = new TinyColor(b);
  if (!first.isValid || !second.isValid) return a === b;
  return first.equals(second);
};
