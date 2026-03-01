"use client";

import type { KonvaEventObject } from "konva/lib/Node";
// import type { Stage as StageType } from "konva/lib/Stage";
import { useCallback, useState } from "react";
import { Layer, Rect, Stage, Line } from "react-konva";
import { Grid } from "./Grid";

export interface Camera {
  x: number;
  y: number;
  zoom: number;
}

const { sign } = Math;
const ZOOM_SPEED = 1.1;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.1;

const Canvas = () => {
  // const [scale, setScale] = useState({ x: 1, y: 1 });
  // const [pos, setPos] = useState({});

  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const handleWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    if (stage) {
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();
      if (!pointer) return;
      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };
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

  return (
    <Stage
      width={innerWidth}
      height={innerHeight}
      draggable
      scale={{ x: camera.zoom, y: camera.zoom }}
      x={camera.x}
      y={camera.y}
      onDragMove={(e) =>
        setCamera((prev) => ({ ...prev, x: e.target.x(), y: e.target.y() }))
      }
      onWheel={handleWheel}
    >
      <Layer listening={false}>
        <Grid camera={camera} width={innerWidth} height={innerHeight} />
      </Layer>
      <Layer>
        <Rect width={50} height={50} fill={"green"} draggable preventDefault />
      </Layer>
    </Stage>
  );
};

export default Canvas;
