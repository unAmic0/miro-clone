"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  MousePointer2,
  TypeOutline,
  StickyNote,
  Square,
  Circle,
  Pencil,
  Undo,
  Redo,
} from "lucide-react";
import { ToolButton } from "./ToolButton";
import type { Dispatch, SetStateAction } from "react";
import type { CanvasState } from "@/types/canvas";
import { CanvasMode, CanvasLayer } from "@/types/canvas";
import { useHistory } from "@liveblocks/react/suspense";

interface Props {
  canvasState: CanvasState;
  setCanvasState: Dispatch<SetStateAction<CanvasState>>;
}

const Toolbar = ({ canvasState, setCanvasState }: Props) => {
  const { canUndo, canRedo, undo, redo } = useHistory();

  return (
    <nav className="flex select-none flex-col gap-3 absolute top-1/2 -translate-y-1/2 left-2">
      <section className="flex flex-col bg-white shadow-2xl shadow-black p-1 gap-y-1">
        <ToolButton
          icon={MousePointer2}
          label="cursor"
          active={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Selecting
          }
          handleClick={() => setCanvasState({ mode: CanvasMode.None })}
        />
        <ToolButton
          icon={TypeOutline}
          label="text"
          active={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layer === CanvasLayer.Text
          }
          handleClick={() =>
            setCanvasState((prev) => ({
              ...prev,
              mode: CanvasMode.Inserting,
              layer: CanvasLayer.Text,
            }))
          }
        />

        <ToolButton
          icon={StickyNote}
          label="sticker"
          active={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layer === CanvasLayer.Note
          }
          handleClick={() =>
            setCanvasState((prev) => ({
              ...prev,
              mode: CanvasMode.Inserting,
              layer: CanvasLayer.Note,
            }))
          }
        />
        <ToolButton
          icon={Square}
          label="rectangle"
          active={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layer === CanvasLayer.Rectangle
          }
          handleClick={() =>
            setCanvasState((prev) => ({
              ...prev,
              mode: CanvasMode.Inserting,
              layer: CanvasLayer.Rectangle,
            }))
          }
        />
        <ToolButton
          icon={Circle}
          label="circle"
          active={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layer === CanvasLayer.Ellipse
          }
          handleClick={() =>
            setCanvasState((prev) => ({
              ...prev,
              mode: CanvasMode.Inserting,
              layer: CanvasLayer.Ellipse,
            }))
          }
        />
        <ToolButton
          icon={Pencil}
          label="pencil"
          active={canvasState.mode === CanvasMode.Pencil}
          handleClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
        />
      </section>
      <section className="bg-white flex flex-col shadow-2xl shadow-black">
        <ToolButton
          label="undo"
          disabled={!canUndo()}
          icon={Undo}
          handleClick={undo}
        />
        <ToolButton
          label="redo"
          disabled={!canRedo()}
          icon={Redo}
          handleClick={redo}
        />
      </section>
    </nav>
  );
};

Toolbar.Skeleton = () => {
  return (
    <nav className="flex flex-col gap-3 absolute top-1/2 -translate-y-1/2 left-2 w-[60px]">
      <Skeleton className="bg-white shadow-2xl shadow-black w-full h-32" />
      <Skeleton className="bg-white shadow-2xl shadow-black w-full h-16" />
    </nav>
  );
};
export default Toolbar;
