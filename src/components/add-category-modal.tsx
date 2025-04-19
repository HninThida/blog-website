"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, Trash2 } from "lucide-react";
import { Label } from "./ui/label";
import { postData } from "@/lib/utils";

type CategoryFormValues = {
	categories: { name: string }[];
};

export function AddCategoryDialog() {
	const [open, setOpen] = useState(false);

	const { control, register, handleSubmit, reset } =
		useForm<CategoryFormValues>({
			defaultValues: {
				categories: [{ name: "" }],
			},
		});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "categories",
	});

	const onSubmit = async (data: CategoryFormValues) => {
		console.log("Submitted Categories:", data.categories);
		console.log(data.categories);

		try {
			// Loop through each category and post
			for (const category of data.categories) {
				if (category.name.trim()) {
					const response = await postData("/blogs/categories", {
						name: category.name,
					});
					console.log(response);
				}
			}

			reset({ categories: [{ name: "" }] });
			setOpen(false);
		} catch (error) {
			console.error("Failed to submit categories:", error);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="w-full sm:w-auto">
					{" "}
					<CirclePlus size={18} />
					<span className="ms-2"> Add Categories</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Add Categories</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4">
					<Label> Category name </Label>

					{fields.map((field, index) => (
						<div
							key={field.id}
							className="flex items-center gap-2">
							<Input
								{...register(
									`categories.${index}.name` as const
								)}
								placeholder={`Category ${index + 1}`}
								className="flex-1 "
							/>
							{fields.length > 1 && (
								<Button
									type="button"
									variant="ghost"
									onClick={() => remove(index)}>
									<Trash2 className="h-4 w-4 text-red-500" />
								</Button>
							)}
						</div>
					))}
					<Button
						type="button"
						variant="outline"
						className="w-full"
						onClick={() => append({ name: "" })}>
						+ Add Category
					</Button>
					<div className="flex justify-end">
						<div className="space-x-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button type="submit">Save</Button>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
