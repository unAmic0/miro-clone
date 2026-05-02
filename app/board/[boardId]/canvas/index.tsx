"use client";

import { TinyColor } from "@ctrl/tinycolor";
import { useMutation } from "@liveblocks/react/suspense";
import type { KonvaEventObject } from "konva/lib/Node";
import type { Stage as StageType } from "konva/lib/Stage";
import type { Vector2d } from "konva/lib/types";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import { Layer, Stage } from "react-konva";
import {
  type Camera,
  CanvasLayer as CanvasLayerEnum,
  CanvasMode,
  type LayerType,
} from "@/types/canvas";
import CanvasLayer from "../_components/CanvasLayer";
import CursorsPresence from "../_components/CursorsPresence";
import { useCanvas } from "../CanvasContext";
import { Grid } from "./Grid";

const ZOOM_SPEED = 1.1;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.1;
// todo: change later
const lastSelectedColor = new TinyColor("red");

const getAbsolutePointerPos = (stage: StageType | null) => {
  const pointerPos = stage?.getPointerPosition();
  if (stage && pointerPos) {
    return {
      x: (pointerPos.x - stage.x()) / stage.scaleX(),
      y: (pointerPos.y - stage.y()) / stage.scaleY(),
    };
  }
};

const Canvas = () => {
  const { canvasState } = useCanvas();

  const [layers, setLayers] = useState<Array<LayerType>>([]);

  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const [newLayer, setNewLayer] = useState<LayerType | null>(null);

  const handleWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    const mousePointTo = getAbsolutePointerPos(stage);
    if (stage && mousePointTo) {
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      const newScale =
        e.evt.deltaY < 0 ? oldScale * ZOOM_SPEED : oldScale / ZOOM_SPEED;

      const finalScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newScale));

      const newPos = {
        x: pointer.x - mousePointTo.x * finalScale,
        y: pointer.y - mousePointTo.y * finalScale,
      };

      setCamera({ x: newPos.x, y: newPos.y, zoom: finalScale });
    }
  }, []);

  const setCursorPresence = useMutation(
    ({ setMyPresence }, cursor: Vector2d) => {
      setMyPresence({ cursor });
    },
    [],
  );

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const pointerPos = getAbsolutePointerPos(e.target.getStage());

    if (pointerPos) {
      setCursorPresence(pointerPos);
      if (canvasState.mode === CanvasMode.Inserting && newLayer) {
        setNewLayer(
          (prev) =>
            prev && {
              ...prev,
              width: pointerPos.x - prev.position.x,
              height: pointerPos.y - prev.position.y,
            },
        );
      }
    }
  };

  return (
    <Stage
      width={innerWidth}
      height={innerHeight}
      draggable
      onContextMenu={(e) => e.evt.preventDefault()}
      scale={{ x: camera.zoom, y: camera.zoom }}
      x={camera.x}
      y={camera.y}
      onClick={(e) => e.evt.preventDefault()}
      onDragMove={(e) => {
        setCamera((prev) => ({ ...prev, x: e.target.x(), y: e.target.y() }));
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={(e) => {
        if (e.evt.buttons === 4 || e.evt.buttons === 2) e.target.startDrag();

        if (e.evt.buttons === 1) {
          if (canvasState.mode !== CanvasMode.None) {
            e.target.stopDrag();
          }
          if (
            canvasState.mode === CanvasMode.Inserting &&
            (canvasState.layer === CanvasLayerEnum.Rectangle ||
              canvasState.layer === CanvasLayerEnum.Ellipse)
          ) {
            // todo: fix later
            setNewLayer({
              id: nanoid(),
              layerType: canvasState.layer,
              position: getAbsolutePointerPos(e.target.getStage())!,
              width: 0,
              height: 0,
              fill: lastSelectedColor,
            });
          }
        }
      }}
      onMouseUp={() => {
        if (canvasState.mode === CanvasMode.Inserting && newLayer) {
          setLayers((prev) => [
            ...prev,
            {
              ...newLayer,
            },
          ]);
        }
        setNewLayer(null);
      }}
      onWheel={handleWheel}
    >
      <Layer listening={false}>
        <Grid camera={camera} width={innerWidth} height={innerHeight} />
      </Layer>
      <CursorsPresence />
      {newLayer && <CanvasLayer layer={newLayer} />}
      {layers.map((layer) => (
        <CanvasLayer key={layer.id} layer={layer} />
      ))}
    </Stage>
  );
};

export default Canvas;
