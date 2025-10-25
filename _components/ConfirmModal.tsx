import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogAction,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
	header: string;
	description: string;
	handleConfirm: () => void;
	children: React.ReactNode;
}

export const ConfirmModal = ({
	header,
	description,
	handleConfirm,
	children,
}: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{header}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
