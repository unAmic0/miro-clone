"use client";

import { useMutation } from "@liveblocks/react/suspense";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLastUsedColor } from "@/store/useLastUsedColor";
import { isSameColor, PRESET_COLORS, toHexColor } from "./colors";

interface Props {
  layerId: string;
  fill: string;
}

/**
 * Undo granularity: dragging the saturation/hue sliders fires `onChange` on
 * every animation frame, so storage is written at most every `THROTTLE_MS`.
 * The picker itself is uncontrolled between writes, otherwise the handle fights
 * the pointer.
 */
const THROTTLE_MS = 80;

const ChangeColor = ({ layerId, fill }: Props) => {
  const setLastUsedColor = useLastUsedColor((state) => state.setColor);

  // keeps the picker handle under the pointer while the writes are throttled
  const [draft, setDraft] = useState(fill);
  const lastWrite = useRef(0);

  // a layer recolored by somebody else (or by an undo) wins over a stale draft
  useEffect(() => {
    setDraft(fill);
  }, [fill]);

  const changeFill = useMutation(({ storage }, id: string, color: string) => {
    const layer = storage.get("layers").get(id);
    // only the `fill` key is touched: replacing the whole LiveObject would
    // clobber a drag or a resize somebody else is doing at the same time
    layer?.set("fill", color);
  }, []);

  const commit = (color: string, force = false) => {
    setDraft(color);

    const now = Date.now();
    if (!force && now - lastWrite.current < THROTTLE_MS) return;
    lastWrite.current = now;

    const hex = toHexColor(color);
    if (!hex) return;

    changeFill(layerId, hex);
    setLastUsedColor(hex);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Change color"
          className="flex size-7 items-center justify-center rounded-md duration-300 hover:bg-[#f1f5fb]"
        >
          {/* the swatch shows the layer's own color, like the tool it stands for */}
          <span
            aria-hidden
            className="size-4 rounded-full border border-black/10"
            style={{ backgroundColor: fill }}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="w-auto bg-white p-3 text-sm shadow-2xl shadow-black"
      >
        <div className="grid grid-cols-6 gap-1.5">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={color}
              aria-pressed={isSameColor(color, fill)}
              onClick={() => commit(color, true)}
              className={cn(
                "size-5 rounded-full border border-black/10 duration-150 hover:scale-110",
                isSameColor(color, fill) &&
                  "ring-2 ring-[#023e8a] ring-offset-1",
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="my-3 h-px bg-neutral-200" />

        {/* react-colorful: ~2.8kB, no dependencies, keyboard accessible */}
        <HexColorPicker
          color={draft}
          onChange={commit}
          onChangeEnd={(color) => commit(color, true)}
          style={{ width: "100%", height: 150 }}
        />

        <ColorInput value={draft} onCommit={(color) => commit(color, true)} />
      </PopoverContent>
    </Popover>
  );
};

interface ColorInputProps {
  value: string;
  onCommit: (color: string) => void;
}

/** Hex field: keeps what the user types locally and only writes valid colors. */
const ColorInput = ({ value, onCommit }: ColorInputProps) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <input
      aria-label="Hex color"
      className="mt-3 w-full rounded-sm border border-neutral-200 px-2 py-1 font-mono text-xs uppercase outline-none focus:border-[#023e8a]"
      onChange={(e) => {
        setText(e.target.value);
        const hex = toHexColor(e.target.value);
        if (hex) onCommit(hex);
      }}
      onBlur={() => setText(value)}
      value={text}
    />
  );
};

export default ChangeColor;
