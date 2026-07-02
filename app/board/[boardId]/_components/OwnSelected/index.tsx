"use client";

import { useSelf, useStorage } from "@liveblocks/react/suspense";
import { Group, Rect } from "react-konva";
import { getMiniSquares } from "./getMiniSquares";
import { useCanvas } from "@/app/board/[boardId]/CanvasContext";
import { CanvasMode } from "@/types/canvas";

const OwnSelection = () => {
  const { setCanvasState, canvasState } = useCanvas();

  const {
    presence: { selection },
  } = useSelf();

  const selectedLayer = useStorage((storage) => storage.layers[selection[0]]);

  if (!selectedLayer) return;

  const { position, width, height } = selectedLayer;

  const miniSquares = getMiniSquares({
    x: position.x,
    y: position.y,
    width,
    height,
  });

  return (
    <Group>
      <Rect
        x={position.x}
        y={position.y}
        width={width}
        height={height}
        strokeWidth={2}
        stroke={"#023e8a"}
      />

      {miniSquares.map((miniSquare, i) => {
        return (
          <Rect
            onMouseDown={(e) => {
              e.cancelBubble = true;
              e.evt.stopPropagation();
              setCanvasState({
                mode: CanvasMode.Resizing,
                direction: miniSquare.resizeDirection,
                layerId: selectedLayer.id,
              });
            }}
            key={`#miniSquare${i}`}
            x={miniSquare.x}
            y={miniSquare.y}
            width={miniSquare.width}
            height={miniSquare.height}
            strokeWidth={2}
            stroke={"#023e8a"}
            fill={"white"}
            onMouseEnter={() => {
              document.body.style.cursor = miniSquare.pointer;
            }}
            onMouseLeave={() => {
              // during the resizing the cursor is moving faster that the miniSquare,
              // so it's to avoid cursor blinking
              if (canvasState.mode !== CanvasMode.Resizing) {
                document.body.style.cursor = "default";
              }
            }}
          />
        );
      })}
    </Group>
  );
};

export default OwnSelection;
