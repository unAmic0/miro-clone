"use client";

import type Konva from "konva";
import type { Vector2d } from "konva/lib/types";
import { type FC, useEffect, useRef } from "react";
import { Group, Path, Text } from "react-konva";

interface Props {
  color: string;
  position: Vector2d;
  name: string;
}

const EASE = 0.1;

const Cursor: FC<Props> = ({ color, position, name }) => {
  const groupRef = useRef<Konva.Group>(null);

  // all this code, up to the render is for making the cursor movement more smooth
  const targetPos = useRef<Vector2d>(position);
  const currentPos = useRef<Vector2d>(position);

  useEffect(() => {
    targetPos.current = position;
  }, [position]);

  useEffect(() => {
    let frame: number;

    const animate = () => {
      if (targetPos.current && currentPos.current && groupRef.current) {
        const dx = targetPos.current.x - currentPos.current.x;
        const dy = targetPos.current.y - currentPos.current.y;

        currentPos.current.x += dx * EASE;
        currentPos.current.y += dy * EASE;

        groupRef.current.position(currentPos.current);
      }

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Group ref={groupRef}>
      <Path
        fill={color}
        data="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"
      />
      <Text x={10} y={18} text={name} fill={color} padding={3} fontSize={15} />
    </Group>
  );
};

export default Cursor;
