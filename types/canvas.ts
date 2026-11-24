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
  /**
   * Stacking order: the bigger the number, the closer the layer is to the top
   * (and the later it is painted). It is a number rather than the position in
   * the storage map, because a `LiveMap` doesn't guarantee the order of its
   * keys, so the panels that reorder layers couldn't rely on it.
   *
   * Layers created before this field existed don't have it: read it as `?? 0`.
   */
  zIndex: number;
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
