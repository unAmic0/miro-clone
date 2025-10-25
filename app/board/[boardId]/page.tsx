import Canvas from "./canvas";

interface Props {
  params: {
    boardId: string;
  };
}
const BoardPage = ({ params }: Props) => {
  return <Canvas />;
};

export default BoardPage;
