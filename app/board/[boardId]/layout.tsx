import Info from "./_components/Info";
import Toolbar from "./_components/Toolbar";
import Users from "./_components/Users";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: {
    boardId: string;
  };
}
export default ({ children, params }: Props) => {
  return (
    <>
      <Info boardId={params.boardId} />
      <Users />
      <Toolbar />

      {children}
    </>
  );
};
