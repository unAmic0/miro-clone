import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
	label: string;
	children: React.ReactNode;
	side?: "top" | "bottom" | "left" | "right";
	align?: "start" | "center" | "end";
	sideOffset?: number;
	alignOffset?: number;
}

export const Hint = ({
	label,
	children,
	side,
	align,
	sideOffset,
	alignOffset,
}: Props) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					align={align}
					sideOffset={sideOffset}
					alignOffset={alignOffset}
				>
					<p className="text-lg">{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
