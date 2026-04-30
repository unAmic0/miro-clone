"use client";

import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import type { Id } from "@/convex/_generated/dataModel";
import Info from "./_components/Info";
import Room from "./_components/Room";
import Toolbar from "./_components/Toolbar";
import Users from "./_components/Users";
import { CanvasProvider } from "./CanvasContext";

type Params = {
  boardId: Id<"boards">;
};

interface Props {
  children: ReactNode;
}

export default ({ children }: Props) => {
  const params = useParams<Params>();

  return (
    <Room id={params.boardId}>
      <Info boardId={params.boardId} />
      <Users />
      <CanvasProvider>
        <Toolbar />
        {children}
      </CanvasProvider>
    </Room>
  );
};
