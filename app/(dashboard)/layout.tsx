"use client";

import type { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import { OrgSidebar } from "./_components/OrgSidebar";
import { Navbar } from "./_components/Navbar";
import { Authenticated } from "convex/react";

interface Props {
	children: ReactNode;
}

export default ({ children }: Props) => {
	return (
		<Authenticated>
			<div className="h-dvh flex w-dvw">
				<Sidebar />
				<OrgSidebar />
				<main className="flex flex-col flex-1">
					<Navbar />
					{children}
				</main>
			</div>
		</Authenticated>
	);
};
