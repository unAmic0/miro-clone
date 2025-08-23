"use client";
import { useOrganizationList } from "@clerk/nextjs";
import { Organization } from "./Organization";

export const Organizations = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) return null;

  return (
    <ul className="flex flex-col gap-3">
      {userMemberships.data.map((mem) => (
        <Organization key={mem.organization.id} {...mem.organization} />
      ))}
    </ul>
  );
};
