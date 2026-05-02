"use client";
import { useOthers } from "@liveblocks/react/suspense";
import Cursor from "./Cursor";

const CursorsPresence = () => {
  const others = useOthers();
  return (
    <>
      {others.map((other) => {
        const { presence } = other;
        return (
          presence.cursor && (
            <Cursor
              key={`cursor${other.connectionId}`}
              color={presence.presenceColor}
              position={presence.cursor}
              name={other.info.name}
            />
          )
        );
      })}
    </>
  );
};

export default CursorsPresence;
