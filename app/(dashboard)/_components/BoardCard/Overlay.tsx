import Link from "next/link";

export const Overlay = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/board/${id}`}
      className="size-full bg-black rounded-t-2xl opacity-0 group-hover:opacity-50 duration-300"
    />
  );
};
