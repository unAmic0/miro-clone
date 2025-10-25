interface Props {
  boardId: string;
}

const Info = ({ boardId }: Props) => {
  return (
    <aside className="absolute top-2 left-2 bg-white shadow-2xl p-1.5 rounded-sm shadow-black">
      board id is : {boardId}
    </aside>
  );
};

export default Info;
