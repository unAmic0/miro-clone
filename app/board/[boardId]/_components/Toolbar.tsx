const Toolbar = () => {
  return (
    <nav className="flex select-none flex-col gap-3 absolute top-1/2 -translate-y-1/2 left-2 [&_span]:p-1">
      <section className="flex flex-col bg-white shadow-2xl shadow-black">
        <span>pencil</span>
        <span>cursor</span>
        <span>circle</span>
        <span>square</span>
      </section>
      <section className="bg-white flex flex-col shadow-2xl shadow-black">
        <span>Undo</span>
        <span>Redo</span>
      </section>
    </nav>
  );
};
export default Toolbar;
