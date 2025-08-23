"use client";

import {
	UserButton,
	OrganizationSwitcher,
	useOrganization,
} from "@clerk/nextjs";
import { SearchInput } from "./SearchInput";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
	const { organization } = useOrganization();
	return (
		<nav className="w-full p-3 flex gap-x-3">
			<div className="w-full hidden lg:block">
				<SearchInput />
			</div>
			<div className="block flex-1 lg:hidden">
				<OrganizationSwitcher hidePersonal />
			</div>
			{organization && <InviteButton />}
			<UserButton />
		</nav>
	);
};
