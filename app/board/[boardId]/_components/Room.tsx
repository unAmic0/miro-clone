"use client";
import { random } from "@ctrl/tinycolor";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import type { ReactNode } from "react";
import Loader from "./Loader";

const Room = ({ children, id }: { children: ReactNode; id: string }) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
      <RoomProvider
        initialPresence={{
          cursor: null,
          presenceColor: random().toHexString(),
        }}
        id={id}
      >
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
export default Room;
