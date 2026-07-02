"use client";

import { LiveObject } from "@liveblocks/node";
import {
  shallow,
  useMutation,
  useOthers,
  useStorage,
} from "@liveblocks/react/suspense";
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
  type TLayer,
} from "@/types/canvas";
import CanvasLayer from "../_components/CanvasLayer";
import CursorsPresence from "../_components/CursorsPresence";
import { useCanvas } from "../CanvasContext";
import { Grid } from "./Grid";
import OwnSelection from "../_components/OwnSelected";
import { resizeLayer } from "@/lib/utils";

const ZOOM_SPEED = 1.1;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.1;
// todo: change later
const lastSelectedColor = "red";

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
  const { canvasState, setCanvasState } = useCanvas();

  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const [newLayer, setNewLayer] = useState<TLayer | null>(null);

  const insertLayer = useMutation(({ storage }, layer: TLayer) => {
    storage.get("layers").set(layer.id, new LiveObject(layer));
  }, []);

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

  const layers = useStorage((storage) => Object.values(storage.layers));

  const changeLayer = useMutation(({ storage }, layer) => {
    storage.get("layers").set(layer.id, new LiveObject(layer));
  }, []);

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
      if (canvasState.mode === CanvasMode.Resizing) {
        const selectedLayer = layers.find(
          (layer) => layer.id === canvasState.layerId,
        );
        if (selectedLayer) {
          changeLayer(
            resizeLayer(canvasState.direction, selectedLayer, pointerPos),
          );
        }
      }
    }
  };

  const selections = useOthers(
    (others) =>
      others.reduce((idsToColorSelection: Record<string, string>, other) => {
        other.presence.selection.forEach((selectedLayerId) => {
          idsToColorSelection[selectedLayerId] = other.presence.presenceColor;
        });
        return idsToColorSelection;
      }, {}),
    shallow,
  );

  const handleLayerClick = useMutation(
    (
      { setMyPresence, self },
      layerId: string,
      e: KonvaEventObject<MouseEvent>,
    ) => {
      e.cancelBubble = true;
      setMyPresence(
        e.evt.shiftKey
          ? { selection: [...self.presence.selection, layerId] }
          : {
              selection: [layerId],
            },
      );
    },
    [],
  );

  const removeSelection = useMutation(({ setMyPresence }) => {
    setMyPresence({ selection: [] });
  }, []);

  return (
    <Stage
      width={innerWidth}
      height={innerHeight}
      draggable={false}
      onContextMenu={({ evt }) => evt.preventDefault()}
      scale={{ x: camera.zoom, y: camera.zoom }}
      x={camera.x}
      y={camera.y}
      onDragMove={(e) => {
        if (canvasState.mode !== CanvasMode.Resizing) {
          setCamera((prev) => ({ ...prev, x: e.target.x(), y: e.target.y() }));
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={(e) => {
        if (canvasState.mode === CanvasMode.None) {
          removeSelection();
        }
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
        if (canvasState.mode === CanvasMode.Resizing) {
          setCanvasState({ mode: CanvasMode.None });
          document.body.style.cursor = "default";
        }
        if (canvasState.mode === CanvasMode.Inserting && newLayer) {
          insertLayer(newLayer);
          setNewLayer(null);
        }
      }}
      onWheel={handleWheel}
    >
      <Layer>
        <Grid camera={camera} width={innerWidth} height={innerHeight} />
        {layers.map((layer) => (
          <CanvasLayer
            handleLayerClick={(e) => handleLayerClick(layer.id, e)}
            key={layer.id}
            layer={layer}
            selectionColor={selections[layer.id]}
          />
        ))}
        {newLayer && <CanvasLayer layer={newLayer} />}
        <OwnSelection />
        <CursorsPresence />
      </Layer>
    </Stage>
  );
};

export default Canvas;
