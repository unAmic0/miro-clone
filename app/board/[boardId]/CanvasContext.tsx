"use client";

import { CanvasLayer, CanvasMode, type CanvasState } from "@/types/canvas";
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

const CanvasContext = createContext<{
  canvasState: CanvasState;
  setCanvasState: Dispatch<SetStateAction<CanvasState>>;
}>({
  canvasState: {
    mode: CanvasMode.None,
  },
  setCanvasState: () => {},
});

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.Inserting,
    layer: CanvasLayer.Rectangle,
  });

  return (
    <CanvasContext.Provider value={{ canvasState, setCanvasState }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
