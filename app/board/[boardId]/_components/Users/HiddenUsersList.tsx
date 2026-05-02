import type { User } from "@liveblocks/node";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface Props {
  hiddenUsers: User[];
}

export const HiddenUsersList = ({ hiddenUsers }: Props) => {
  return (
    <ul className="bg-white text-black  text-lg rounded-xl">
      {hiddenUsers.map(({ connectionId, info: { picture, name } }) => (
        <li
          className="flex gap-2 border-t border-b p-1 border-gray-300"
          key={`hidden-user${connectionId}`}
        >
          <Avatar>
            <AvatarImage src={picture} alt={name} />
          </Avatar>
          <p>{name}</p>
        </li>
      ))}
    </ul>
  );
};
