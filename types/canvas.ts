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
  Resizing,
}

export enum ResizeSide {
  Top = 0b0001,
  Bottom = 0b0010,
  Left = 0b0100,
  Right = 0b1000,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.Selecting;
    }
  | { mode: CanvasMode.Pencil }
  | {
      mode: CanvasMode.Resizing;
      /**
       * direction - a bitmask compatible with the {@link ResizeSide} enum
       */
      direction: number;
      layerId: string;
    }
  | { mode: CanvasMode.Inserting; layer: CanvasLayer };

export interface Camera {
  x: number;
  y: number;
  zoom: number;
}
