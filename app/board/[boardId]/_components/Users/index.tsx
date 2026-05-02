"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiddenUsersList } from "./HiddenUsersList";
import { UserLogo } from "./UserLogo";

const MAX_SHOWN_USERS = 5;

const Users = () => {
  const others = useOthers();
  const me = useSelf();
  const hiddenUsers = others.slice(MAX_SHOWN_USERS - 1);

  return (
    <div className="absolute top-2 z-10 right-3 bg-white shadow-2xl p-1.5 rounded-sm shadow-black flex gap-x-2">
      <UserLogo logo={me.info.picture} name="You" borderColor="white" />
      {others.slice(0, MAX_SHOWN_USERS - 1).map((other) => (
        <UserLogo
          key={other.connectionId}
          logo={other.info.picture}
          name={other.info.name}
          borderColor={other.presence.presenceColor}
        />
      ))}
      {!!hiddenUsers.length && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="ring-2 ring-black/50 rounded-full size-8 flex justify-center items-center">
              +{others.length - MAX_SHOWN_USERS + 1}
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-white [--primary:white] [&_svg]:fill-white shadow-2xl shadow-black py-2">
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
