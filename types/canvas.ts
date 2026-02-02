export enum CanvasLayer {
  Ellipse,
  Rectangle,
  Path,
  Note,
  Text,
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

// export type CanvasState = {
// mode: CanvasMode;
// if (mode===CanvasMode.Inserting) layer: LayerType
// };
