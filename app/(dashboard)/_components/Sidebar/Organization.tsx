"use client";

import Image from "next/image";
import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Hint } from "@/_components/Hint";

interface Props {
	id: string;
	imageUrl: string;
	name: string;
}

export const Organization = ({ id, name, imageUrl }: Props) => {
	const { organization } = useOrganization();
	const { setActive } = useOrganizationList();
	const isActive = organization?.id === id;

	const onClick = () => {
		if (setActive && !isActive) setActive({ organization: id });
	};
	return (
		<Hint label={name} side="right">
			<button>
				<Image
					width={60}
					height={60}
					alt={name}
					src={imageUrl}
					className={clsx(
						"rounded-md opacity-75 hover:opacity-100 duration-300",
						{ "opacity-100": isActive },
					)}
					onClick={onClick}
				/>
			</button>
		</Hint>
	);
};
