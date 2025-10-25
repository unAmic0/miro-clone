import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/useApiMutation";
import { cn } from "@/lib/utils";
import { useOrganization } from "@clerk/nextjs";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface Props {
  title: string;
  createdAtLabel: string;
  authourLabel: string;
  boardId: Id<"boards">;
  isFavorite?: boolean;
}

export const Footer = ({
  title,
  createdAtLabel,
  authourLabel,
  isFavorite,
  boardId,
}: Props) => {
  const [favorite] = useApiMutation(api.board.favorite);
  const [unfavorite] = useApiMutation(api.board.unfavorite);
  const { organization } = useOrganization();

  const handleStarClick = () => {
    if (!organization) return toast.error("smth went wrong");
    if (isFavorite) {
      unfavorite({ boardId }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      favorite({ boardId, orgId: organization.id }).catch(() =>
        toast.error("Failed to favorite"),
      );
    }
  };

  return (
    <div className="rounded-b-2xl p-3 relative">
      <p>{title}</p>
      <p className="text-muted-foreground opacity-0 group-hover:opacity-100 duration-300">
        {authourLabel}, {createdAtLabel}
      </p>
      <button
        onClick={handleStarClick}
        className="absolute hover:bg-blue-200 rounded-sm p-1 right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-300"
      >
        <Star
          className={cn(
            "text-muted-foreground hover:text-blue-600",
            isFavorite && "fill-muted-foreground hover:fill-blue-600",
          )}
        />
      </button>
    </div>
  );
};
