import { Hint } from "@/_components/Hint";
import { cn } from "@/lib/utils";
import type { FC } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  handleClick: () => void;
  disabled?: boolean;
}

export const ToolButton: FC<Props> = ({
  label,
  icon: Icon,
  active,
  disabled,
  handleClick,
}) => {
  return (
    <Hint side="left" label={label}>
      <button
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "rounded-md justify-center items-center flex p-1 duration-300 disabled:text-gray-500",
          active && "bg-[#dce7ff] text-[#465879]",
        )}
      >
        <Icon />
      </button>
    </Hint>
  );
};
