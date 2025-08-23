import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "@/_components/Hint";

export const NewButton = () => {
	return (
		<Dialog>
			<Hint label="add a new organization" side="right" align="center">
				<DialogTrigger asChild>
					<button className="aspect-square bg-gray-400 rounded-xl flex justify-center items-center hover:opacity-95 duration-300">
						<Plus className="text-white" />
					</button>
				</DialogTrigger>
			</Hint>
			<DialogContent className="p-0 bg-transparent border-none">
				<CreateOrganization />
			</DialogContent>
		</Dialog>
	);
};
