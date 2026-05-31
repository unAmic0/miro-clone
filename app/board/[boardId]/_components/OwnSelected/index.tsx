"use client";

import { useSelf, useStorage } from "@liveblocks/react/suspense";
import { Layer, Rect } from "react-konva";
import { setCursor } from "@/lib/utils";
import { getMiniSquares } from "./getMiniSquares";

const OwnSelection = () => {
  const {
    presence: { selection },
  } = useSelf();

  const selectedLayer = useStorage((storage) =>
    storage.layers.find((layer) => layer.id === selection[0]),
  );

  if (!selectedLayer) return;

  const { position, width, height } = selectedLayer;

  const miniSquares = getMiniSquares({
    x: position.x,
    y: position.y,
    width,
    height,
  });

  return (
    <Layer>
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
            key={`#miniSquare${i}`}
            x={miniSquare.x}
            y={miniSquare.y}
            width={miniSquare.width}
            height={miniSquare.height}
            strokeWidth={2}
            stroke={"#023e8a"}
            fill={"white"}
            onMouseEnter={(e) => setCursor(e, miniSquare.pointer)}
            onMouseLeave={(e) => setCursor(e, "default")}
          />
        );
      })}
    </Layer>
  );
};

export default OwnSelection;
