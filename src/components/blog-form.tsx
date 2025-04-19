"use client";

import { useState } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Switch } from "./ui/switch";
import { AddCategoryDialog } from "./add-category-modal";
import { Checkbox } from "./ui/checkbox";
import ReactQuill from "react-quill";
type Category = {
	value: string;
	label: string;
	id: number;
};
type Tag = {
	value: string;
	label: string;
	id: number;
};

export default function CreateBlogForm() {
	const [selectedCategories, setSelectedCategories] = useState<Category[]>(
		[]
	);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [open, setOpen] = useState(false);
	const [openTag, setOpenTag] = useState(false);
	const [isPublished, setIsPublished] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [searchTag, setSearchTag] = useState("");
	const [value, setValue] = useState("");

	const categories: Category[] = [
		{ value: "category1", label: "Category One", id: 1 },
		{ value: "category2", label: "Category Two", id: 2 },
		{ value: "category3", label: "Category Three", id: 3 },
		{ value: "category4", label: "Category Four", id: 4 },
		{ value: "category5", label: "Category Five", id: 5 },
		{ value: "category6", label: "Category Six", id: 6 },
	];
	const tags: Tag[] = [
		{ value: "category1", label: "Category One", id: 1 },
		{ value: "category2", label: "Category Two", id: 2 },
		{ value: "category3", label: "Category Three", id: 3 },
		{ value: "category4", label: "Category Four", id: 4 },
		{ value: "category5", label: "Category Five", id: 5 },
		{ value: "category6", label: "Category Six", id: 6 },
	];

	const toggleCategory = (category: Category) => {
		setSelectedCategories(prev => {
			const exists = prev.some(c => c.id === category.id);
			if (exists) {
				return prev.filter(c => c.id !== category.id);
			} else {
				return [...prev, category];
			}
		});
	};

	const selectedLabels = selectedCategories.map(c => c.label).join(", ");

	const filteredCategories = categories.filter(category =>
		category.label.toLowerCase().includes(searchText.toLowerCase())
	);
	const toggleTag = (tag: Tag) => {
		setSelectedTags(prev => {
			const exists = prev.some(c => c.id === tag.id);
			if (exists) {
				return prev.filter(c => c.id !== tag.id);
			} else {
				return [...prev, tag];
			}
		});
	};

	const selectedTagLabels = selectedTags.map(c => c.label).join(", ");

	const filteredTags = tags.filter(category =>
		category.label.toLowerCase().includes(searchTag.toLowerCase())
	);

	return (
		<Card className="max-w-2xl mx-auto p-6">
			<CardHeader>
				<CardTitle>Create New Category</CardTitle>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Title */}
				<div>
					<Label>Enter blog title</Label>
					<Input
						className="mt-3"
						id="title"
						placeholder="Blog title"
					/>
				</div>

				{/* Slug */}
				<div>
					<Label htmlFor="slug">Enter slug</Label>
					<Input
						className="mt-3"
						id="slug"
						placeholder="slug"
					/>
				</div>

				{/* Categories */}
				<div className="flex items-end gap-4 flex-wrap">
					<div className=" flex-1">
						<Label
							htmlFor="category"
							className="mb-3 block">
							Category
						</Label>

						<Select
							open={open}
							onOpenChange={setOpen}>
							<SelectTrigger className="w-full mt-4">
								<span className="truncate text-sm text-muted-foreground">
									{selectedLabels || "Select Categories"}
								</span>
							</SelectTrigger>

							<SelectContent className="overflow-auto max-h-72">
								<div className="p-2">
									<Input
										type="text"
										placeholder="Search categories..."
										value={searchText}
										onChange={e =>
											setSearchText(e.target.value)
										}
										className="w-full mb-2"
									/>

									<div className="space-y-2">
										{filteredCategories.map(category => (
											<div
												key={category.id}
												className="flex items-center space-x-2 px-3">
												<Checkbox
													id={`${category.id}`}
													checked={selectedCategories.some(
														c =>
															c.id === category.id
													)}
													onCheckedChange={() =>
														toggleCategory(category)
													}
												/>
												<label
													htmlFor={`cat-${category.id}`}
													className="text-sm ">
													{category.label}
												</label>
											</div>
										))}
									</div>

									<div className="mt-3 flex justify-end">
										<Button
											variant="outline"
											size="sm"
											onClick={() => setOpen(false)}>
											Close
										</Button>
									</div>
								</div>
							</SelectContent>
						</Select>
					</div>

					<AddCategoryDialog />
				</div>

				{/* Content */}
				<div>
					<Label htmlFor="content">Content</Label>
					{/* <Editor id="content" /> */}
					<div className="my-4">
						<ReactQuill
							id="editor"
							theme="snow"
							value={value}
							onChange={setValue}
							className="min-h-[200px]"
						/>
					</div>
				</div>
				{/* Tag  */}
				<div className="flex p">
					<div className=" flex-1">
						<Label
							htmlFor="category"
							className="mb-3 block">
							Tags
						</Label>

						<Select
							open={openTag}
							onOpenChange={setOpenTag}>
							<SelectTrigger className="w-full mt-4">
								<span className="truncate text-sm text-muted-foreground">
									{selectedTagLabels || "Select Tags"}
								</span>
							</SelectTrigger>

							<SelectContent className="overflow-auto max-h-72">
								<div className="p-2">
									<Input
										type="text"
										placeholder="Search tags..."
										value={searchTag}
										onChange={e =>
											setSearchTag(e.target.value)
										}
										className="w-full mb-2"
									/>

									<div className="space-y-2">
										{filteredTags.map(tag => (
											<div
												key={tag.id}
												className="flex items-center space-x-2 px-3">
												<Checkbox
													id={`${tag.id}`}
													checked={selectedTags.some(
														c => c.id === tag.id
													)}
													onCheckedChange={() =>
														toggleTag(tag)
													}
												/>
												<label
													htmlFor={`cat-${tag.id}`}
													className="text-sm ">
													{tag.label}
												</label>
											</div>
										))}
									</div>

									<div className="mt-3 flex justify-end">
										<Button
											variant="outline"
											size="sm"
											onClick={() => setOpenTag(false)}>
											Close
										</Button>
									</div>
								</div>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Status */}
				<div>
					<Label>Status</Label>
					<Switch
						className="ms-3"
						id="status"
						checked={isPublished}
						onCheckedChange={setIsPublished}
					/>
					<p className="text-sm text-gray-500 mt-4">
						{!isPublished
							? "Your post will be saved as draft"
							: "Your post will be published"}
					</p>
				</div>
			</CardContent>

			<CardFooter className="flex justify-end gap-4">
				<Button variant="outline">Cancel</Button>
				<Button>Save</Button>
			</CardFooter>
		</Card>
	);
}

{
	/* <div className="flex-1">
						<Label
							htmlFor="category"
							className="mb-3 d-block">
							Category
						</Label>
						<div className="mt-4">
							<Select
								onValueChange={value =>
									handleCategoryChange(value)
								}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select Categories" />
								</SelectTrigger>
								<SelectContent className="overflow-auto">
									<div className="p-2">
										<Input
											type="text"
											placeholder="Search categories..."
											value={searchText}
											onChange={e =>
												setSearchText(e.target.value)
											}
											className="w-full"
										/>
									</div>
									{filteredCategories.map((category: any) => (
										<div>
											<div className="flex items-center space-x-2 mb-4 px-3">
												<Checkbox id="terms" />
												<label
													htmlFor="terms"
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
													Accept terms and conditions
												</label>
											</div>
										</div>
									))}
								</SelectContent>
							</Select>
						</div>
					</div> */
}
