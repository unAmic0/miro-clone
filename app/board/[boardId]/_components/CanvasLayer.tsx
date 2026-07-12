import type { KonvaEventObject } from "konva/lib/Node";
import type { FC } from "react";
import { Ellipse, Layer, Rect } from "react-konva";
import { CanvasLayer as CanvasLayerEnum, type TLayer } from "@/types/canvas";

interface Props {
  layer: TLayer;
  handleDragMove?: (e: KonvaEventObject<DragEvent>) => void;
  handleDragEnd?: (e: KonvaEventObject<DragEvent>) => void;
  handleLayerClick?: (e: KonvaEventObject<MouseEvent>) => void;
  selectionColor?: string;
}

const CanvasLayer: FC<Props> = ({
  layer: { layerType, width, height, fill, position },
  handleLayerClick,
  selectionColor,
  handleDragMove,
  handleDragEnd,
}) => {
  switch (layerType) {
    case CanvasLayerEnum.Rectangle:
      return (
        <Rect
          draggable
          x={position.x}
          y={position.y}
          width={width}
          height={height}
          stroke={selectionColor}
          fill={fill}
          strokeWidth={2}
          onClick={handleLayerClick}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        />
      );
    case CanvasLayerEnum.Ellipse:
      return (
        <Ellipse
          draggable
          x={position.x}
          y={position.y}
          radiusX={Math.abs(width)}
          radiusY={Math.abs(height)}
          stroke={fill}
          onClick={handleLayerClick}
          strokeWidth={2}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        />
      );
  }
};

export default CanvasLayer;
