import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hint } from "@/_components/Hint";

interface Props {
  logo: string;
  name: string;
  borderColor?: string;
}

export const UserLogo = ({ logo, name, borderColor }: Props) => {
  return (
    <Hint label={name}>
      <Avatar style={{ borderColor }} className="border-2">
        <AvatarImage src={logo} alt={name[0]} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
    </Hint>
  );
};
