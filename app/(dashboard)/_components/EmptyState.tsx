import Image from "next/image";
interface Props {
  img: string;
  title: string;
  text: string;
}
export const EmptyState = ({ img, title, text }: Props) => {
  return (
    <div className="flex flex-col gap-y-3 size-full justify-center items-center">
      <Image
        width={220}
        height={220}
        className="select-none"
        draggable={false}
        alt="Empty"
        src={img}
      />
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-muted-foreground text-xl">{text}</p>
    </div>
  );
};
