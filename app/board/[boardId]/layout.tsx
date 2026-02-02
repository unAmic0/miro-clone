"use client";

import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import Info from "./_components/Info";
import Room from "./_components/Room";
import Toolbar from "./_components/Toolbar";
import Users from "./_components/Users";
import type { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import type { CanvasState } from "@/types/canvas";
import { CanvasMode } from "@/types/canvas";

type Params = {
  boardId: Id<"boards">;
};

interface Props {
  children: ReactNode;
}

export default ({ children }: Props) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const params = useParams<Params>();

  return (
    <Room id={params.boardId}>
      <Info boardId={params.boardId} />
      <Users />
      <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} />
      {children}
    </Room>
  );
};
