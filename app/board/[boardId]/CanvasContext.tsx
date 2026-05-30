"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import { CanvasMode, type CanvasState } from "@/types/canvas";

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
    mode: CanvasMode.None,
  });

  return (
    <CanvasContext.Provider value={{ canvasState, setCanvasState }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
