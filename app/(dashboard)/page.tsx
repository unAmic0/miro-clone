"use client";
import { useSearchParams } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import { BoardList } from "./_components/BoardList";
import { EmptyOrg } from "./_components/EmptyOrg";

export default () => {
	const { organization } = useOrganization();
	console.log(organization);
	if (!organization) {
		return <EmptyOrg />;
	}

	return <BoardList />;
};
