"use client";

import { useCanRedo, useCanUndo, useHistory } from "@liveblocks/react/suspense";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo,
  Square,
  StickyNote,
  TypeOutline,
  Undo,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CanvasLayer, CanvasMode } from "@/types/canvas";
import { useCanvas } from "../../CanvasContext";
import { ToolButton } from "./ToolButton";

const Toolbar = () => {
  const { undo, redo } = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const { canvasState, setCanvasState } = useCanvas();

  return (
    <nav className="flex z-10 select-none flex-col gap-3 absolute top-1/2 -translate-y-1/2 left-2">
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
          disabled={!canUndo}
          icon={Undo}
          handleClick={undo}
        />
        <ToolButton
          label="redo"
          disabled={!canRedo}
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
