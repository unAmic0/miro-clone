import type { KonvaEventObject } from "konva/lib/Node";
import { Ellipse, Layer, Rect } from "react-konva";
import { CanvasLayer as CanvasLayerEnum, type LayerType } from "@/types/canvas";

const cancelBubble = (e: KonvaEventObject<DragEvent>) =>
  (e.cancelBubble = true);

const CanvasLayer = ({
  layer: { layerType, width, height, fill, position },
}: {
  layer: LayerType;
}) => {
  switch (layerType) {
    case CanvasLayerEnum.Rectangle:
      return (
        <Layer onDragMove={cancelBubble} onDragStart={cancelBubble}>
          <Rect
            x={position.x}
            y={position.y}
            width={width}
            height={height}
            stroke={fill.toRgbString()}
            strokeWidth={2}
          />
        </Layer>
      );
    case CanvasLayerEnum.Ellipse:
      return (
        <Layer onDragMove={cancelBubble} onDragStart={cancelBubble}>
          <Ellipse
            x={position.x}
            y={position.y}
            radiusX={Math.abs(width)}
            radiusY={Math.abs(height)}
            stroke={fill.toRgbString()}
            strokeWidth={2}
          />
        </Layer>
      );
  }
};

export default CanvasLayer;
