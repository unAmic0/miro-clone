"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { UserLogo } from "./UserLogo";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { HiddenUsersList } from "./HiddenUsersList";

const BORDER_COLORS = ["#4a8cc9", "#67be56", "#fbb152", "#7758a4", "#f05f5a"];
const MAX_SHOWN_USERS = 1;

const Users = () => {
  const others = useOthers();
  const me = useSelf();
  const hiddenUsers = others.slice(MAX_SHOWN_USERS - 1);

  return (
    <div className="absolute top-2 right-3 bg-white shadow-2xl p-1.5 rounded-sm shadow-black flex gap-x-2">
      {/*TODO: fix the name*/}
      <UserLogo logo={me.info.picture} name="You" borderColor="white" />
      {others.slice(0, MAX_SHOWN_USERS - 1).map((other) => (
        <UserLogo
          key={other.connectionId}
          logo={other.info.picture}
          // TODO: fix
          name="Vladik"
          // TODO: try this one : borderColor={BORDER_COLORS[parseInt(other.connectionId.slice(-3), 16) % BORDER_COLORS.length]}
          borderColor={
            BORDER_COLORS[Math.floor(Math.random() * BORDER_COLORS.length)]
          }
        />
      ))}
      {!!hiddenUsers.length && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="ring-2 ring-black/50 rounded-full size-8 flex justify-center items-center">
              +{others.length - MAX_SHOWN_USERS + 1}
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-transparent">
            <HiddenUsersList hiddenUsers={hiddenUsers} />
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

Users.Skeleton = () => {
  return (
    <Skeleton className="absolute top-2 right-3 bg-white shadow-2xl p-1.5 rounded-sm shadow-black h-9 w-32" />
  );
};

export default Users;
