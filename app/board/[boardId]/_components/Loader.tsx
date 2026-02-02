import Info from "./Info";
import Toolbar from "./Toolbar";
import Users from "./Users";

const Loader = () => {
  return (
    <main className="w-dvw h-dvh bg-gray-100">
      <Info.Skeleton />
      <Users.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
};

export default Loader;
