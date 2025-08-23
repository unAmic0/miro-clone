import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const InviteButton = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="outline" className="gap-0">
					<Plus className="size-4 mx-1" />
					invite members
				</Button>
			</DialogTrigger>
			<DialogContent>
				<OrganizationProfile />
			</DialogContent>
		</Dialog>
	);
};
