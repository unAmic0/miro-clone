import type { TinyColor } from "@ctrl/tinycolor";
import type { Vector2d } from "konva/lib/types";

export enum CanvasLayer {
  Ellipse,
  Rectangle,
  Path,
  Note,
  Text,
}

export interface LayerType {
  id: string;
  layerType: CanvasLayer;
  position: Vector2d;
  width: number;
  height: number;
  fill: TinyColor;
}

export enum CanvasMode {
  None,
  Selecting,
  Inserting,
  Pencil,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.Selecting;
    }
  | { mode: CanvasMode.Pencil }
  | { mode: CanvasMode.Inserting; layer: CanvasLayer };

export interface Camera {
  x: number;
  y: number;
  zoom: number;
}
