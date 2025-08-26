"use client";
import { useOrganization } from "@clerk/nextjs";
import { BoardList } from "./_components/BoardList";
import { EmptyOrg } from "./_components/EmptyOrg";

export default () => {
	const { organization } = useOrganization();

	if (!organization) {
		return <EmptyOrg />;
	}

	return <BoardList />;
};
