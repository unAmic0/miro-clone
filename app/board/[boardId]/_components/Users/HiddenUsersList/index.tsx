import { User } from "@liveblocks/node";
import { UserLogo } from "../UserLogo";

interface Props {
  hiddenUsers: User[];
}

export const HiddenUsersList = ({ hiddenUsers }: Props) => {
  return (
    <ul className="bg-white text-black p-2 text-lg rounded-xl">
      <li>Andre</li>
      {hiddenUsers.map(({ connectionId, info: { picture, name } }) => (
        <li key={connectionId}>
          <UserLogo name={name} logo={picture} />
          {name}
        </li>
      ))}
    </ul>
  );
};
