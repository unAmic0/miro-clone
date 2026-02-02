import type { Dispatch, SetStateAction } from "react";
import {
	DialogHeader,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogClose,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { safeString } from "@/utils/validators";

const formSchema = z.object({
	title: safeString,
});

export const RenameModal = ({
	id,
	setOpen,
}: {
	id: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const [mutation, isPending] = useApiMutation(api.board.rename);

	const onSubmit = form.handleSubmit(({ title }) => {
		mutation({ id, title }).then(() => {
			setOpen(false);
		});
	});

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Enter board title</DialogTitle>
				<DialogDescription>Enter a new title for this board</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={onSubmit}>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="mb-4">
								<FormControl>
									<Input type="text" {...field} placeholder="board title" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<DialogFooter>
						<DialogClose asChild>
							<Button disabled={isPending} variant="outline" type="button">
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit">Save</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
};
