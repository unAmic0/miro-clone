"use client";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

export const OrgSidebar = () => {
	const searchParams = useSearchParams();
	const favorites = searchParams.get("favorites");
	return (
		<aside className="hidden lg:flex flex-col min-w-52 resize-x overflow-auto p-3 gap-y-3">
			<Link href="/">
				<div className="flex items-center justify-evenly">
					<Image src="/logo.svg" alt="logo" height={60} width={60} />
					<span className={clsx("font-semibold text-2xl", font.className)}>
						Board
					</span>
				</div>
			</Link>
			<OrganizationSwitcher
				hidePersonal
				appearance={{
					elements: {
						rootBox: "mx-auto mt-4 mb-2",
						organizationSwitcherTrigger: "scale-200",
					},
				}}
			/>
			<Link href="/">
				<Button
					className="w-full justify-start"
					variant={favorites ? "ghost" : "secondary"}
				>
					<LayoutDashboard />
					Team boards
				</Button>
			</Link>
			<Link
				href={{
					href: "/",
					query: { favorites: true },
				}}
			>
				<Button
					className="w-full justify-start"
					variant={favorites ? "secondary" : "ghost"}
				>
					<Star />
					Favorite boards
				</Button>
			</Link>
		</aside>
	);
};
