import type { KonvaEventObject } from "konva/lib/Node";
import type { FC } from "react";
import { Ellipse, Layer, Rect } from "react-konva";
import { CanvasLayer as CanvasLayerEnum, type TLayer } from "@/types/canvas";

const cancelBubble = (e: KonvaEventObject<DragEvent>) =>
  (e.cancelBubble = true);

interface Props {
  layer: TLayer;
  handleLayerClick?: (e: KonvaEventObject<MouseEvent>) => void;
  selectionColor?: string;
}

const CanvasLayer: FC<Props> = ({
  layer: { layerType, width, height, fill, position },
  handleLayerClick,
  selectionColor,
}) => {
  switch (layerType) {
    case CanvasLayerEnum.Rectangle:
      return (
        <Rect
          x={position.x}
          y={position.y}
          width={width}
          height={height}
          stroke={selectionColor}
          fill={fill}
          strokeWidth={2}
          onClick={handleLayerClick}
        />
      );
    case CanvasLayerEnum.Ellipse:
      return (
        <Ellipse
          x={position.x}
          y={position.y}
          radiusX={Math.abs(width)}
          radiusY={Math.abs(height)}
          stroke={fill}
          onClick={handleLayerClick}
          strokeWidth={2}
        />
      );
  }
};

export default CanvasLayer;
