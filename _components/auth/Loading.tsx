import Image from "next/image";

export default () => {
	return (
		<div className="h-dvh flex justify-center items-center">
			<Image
				src="/logo.svg"
				alt="loading..."
				width={120}
				height={120}
				className="animate-bounce duration-700"
			/>
		</div>
	);
};
