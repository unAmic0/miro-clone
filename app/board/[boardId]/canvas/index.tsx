"use client";
import { useSelf } from "@liveblocks/react/suspense";

const Canvas = () => {
  const selfInfo = useSelf((me) => me.info);

  return <div className="w-dvw h-dvh bg-gray-100">hi</div>;
};

export default Canvas;
