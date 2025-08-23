import { NewButton } from "./NewButton";
import { Organizations } from "./Organizations";

export default () => {
	return (
		<aside className="h-dvh bg-blue-400 resize-x min-w-20 flex flex-col justify-between overflow-auto border-r border-r-[#e9eaef] p-3">
			<Organizations />
			<NewButton />
		</aside>
	);
};
