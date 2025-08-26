import { Plus } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
	disabled?: boolean;
	orgId: string;
}
export const NewBoardButton = ({ disabled, orgId }: Props) => {
	const [create, pending] = useApiMutation(api.board.create);

	const handleClick = () => {
		create({
			title: "untitled",
			orgId,
		})
			.then(() => toast.success("A new board succesfull created"))
			// TODO: redirect
			.catch(() => toast.error("smth went wrong"));
	};

	return (
		<button
			disabled={disabled || pending}
			className={cn(
				"bg-blue-600 hover:bg-blue-800 aspect-[100/127] flex justify-center items-center flex-col text-white rounded-2xl duration-300",
				(disabled || pending) &&
				"opacity-70 cursor-not-allowed hover:bg-blue-600",
			)}
			onClick={handleClick}
		>
			<Plus className="size-12" />
			<span className="text-xl">New board</span>
		</button>
	);
};
