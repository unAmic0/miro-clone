export enum CanvasLayer {
  Ellipse,
  Rectangle,
  Path,
  Note,
  Text,
}

export type TLayer = {
  id: string;
  layerType: CanvasLayer;
  position: { x: number; y: number };
  width: number;
  height: number;
  fill: string;
};

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
