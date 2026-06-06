import { Line } from "react-konva";
import type { Camera } from "@/types/canvas";

const GRID_SIZE = 50;

interface Props {
  camera: Camera;
  width: number;
  height: number;
}

export const Grid: React.FC<Props> = ({ camera, width, height }) => {
  const lines = [];
  const { zoom } = camera;

  const startX = Math.floor(-camera.x / zoom / GRID_SIZE) * GRID_SIZE;
  const endX = startX + width / zoom + GRID_SIZE;

  const startY = Math.floor(-camera.y / zoom / GRID_SIZE) * GRID_SIZE;
  const endY = startY + height / zoom + GRID_SIZE;

  // vertical lines
  for (let x = startX; x <= endX; x += GRID_SIZE) {
    lines.push(
      <Line
        key={`v-${x}`}
        points={[x, startY, x, endY]}
        stroke="#e0e0e0"
        strokeWidth={1 / zoom}
        perfectDrawEnabled={false}
      />,
    );
  }

  // horizontal lines
  for (let y = startY; y <= endY; y += GRID_SIZE) {
    lines.push(
      <Line
        key={`h-${y}`}
        points={[startX, y, endX, y]}
        stroke="#e0e0e0"
        strokeWidth={1 / zoom}
        perfectDrawEnabled={false}
      />,
    );
  }
  return <>{lines}</>;
};
