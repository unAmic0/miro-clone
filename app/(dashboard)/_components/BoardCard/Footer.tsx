import clsx from "clsx";
import { Star } from "lucide-react";

interface Props {
  title: string;
  createdAtLabel: string;
  authourLabel: string;
  isFavorite: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const Footer = ({
  title,
  createdAtLabel,
  authourLabel,
  isFavorite,
}: Props) => {
  return (
    <div className="rounded-b-2xl p-3 relative">
      <p>{title}</p>
      <p className="text-muted-foreground opacity-0 group-hover:opacity-100 duration-300">
        {authourLabel}, {createdAtLabel}
      </p>
      <button className="absolute hover:bg-blue-200 rounded-sm p-1 right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-300 group/favorites">
        <Star
          className={clsx(
            "text-muted-foreground group-hover/favorites:text-blue-600 duration-300",
            {
              "fill-muted-foreground group-hover/favorites:fill-blue-600":
                isFavorite,
            },
          )}
        />
      </button>
    </div>
  );
};
