import { create } from "zustand";

interface ILastUsedColor {
  color: string;
  setColor: (color: string) => void;
}

/**
 * The color of the next inserted layer: whatever was last picked in the layer
 * tools, so drawing several shapes in one color doesn't mean repainting each of
 * them afterwards.
 */
export const useLastUsedColor = create<ILastUsedColor>((set) => ({
  color: "#e63946",
  setColor: (color) => set({ color }),
}));
