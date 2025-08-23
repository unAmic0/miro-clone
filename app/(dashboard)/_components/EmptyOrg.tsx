import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const EmptyOrg = () => {
  return (
    <div className="flex flex-col gap-y-3 size-full justify-center items-center">
      <Image
        width={220}
        height={220}
        alt="create organization"
        src="/stationery.svg"
      />
      <h1 className="text-4xl font-semibold">Welcome to Boardy</h1>
      <p className="text-muted-foreground text-xl">
        Create an organization to get started
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-xl py-3 px-8">Create organization</Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
          <CreateOrganization />
        </DialogContent>
      </Dialog>
    </div>
  );
};
