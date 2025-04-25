import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { getData, postData, putData } from "@/lib/utils";
import { toast } from "react-toastify";
import { Textarea } from "./ui/textarea";

type Category = {
	name: string;
	id: number;
};
type Tag = {
	name: string;
	id: number;
};
type FormErrors = {
	title?: string;
	slug?: string;
	content?: string;
	categories?: string;
	tags?: string;
};

export default function CreateBlogForm() {
	const [selectedCategories, setSelectedCategories] = useState<Category[]>(
		[]
	);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);
	const [open, setOpen] = useState(false);
	const [openTag, setOpenTag] = useState(false);
	const [publishStatus, setpublishStatus] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [searchTag, setSearchTag] = useState("");
	const [value, setValue] = useState("");
	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [errors, setErrors] = useState<FormErrors>({});
	const { postId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		handleGetCategories();
		handleGetTags();
		if (postId) handleGetBlogById();
	}, []);

	const handleGetBlogById = async () => {
		const result = await getData(`/blogs/${postId}`);
		const post = result.data;
		setTitle(post.title);
		setSlug(post.slug);
		setValue(post.content);
		setSelectedCategories(post.categories || []);
		setSelectedTags(post.tags || []);
		setpublishStatus(post.publishStatus || false);
	};

	const handleGetCategories = async () => {
		const result = await getData(`/categories`);
		setCategories(result.data);
	};

	const handleGetTags = async () => {
		const result = await getData(`/tags`);
		setTags(result.data);
	};

	const toggleCategory = (category: Category) => {
		setSelectedCategories(prev =>
			prev.some(c => c.id === category.id)
				? prev.filter(c => c.id !== category.id)
				: [...prev, category]
		);
	};

	const toggleTag = (tag: Tag) => {
		setSelectedTags(prev =>
			prev.some(t => t.id === tag.id)
				? prev.filter(t => t.id !== tag.id)
				: [...prev, tag]
		);
	};

	const filteredCategories = categories.filter(category =>
		category.name.toLowerCase().includes(searchText.toLowerCase())
	);

	const filteredTags = tags.filter(tag =>
		tag.name.toLowerCase().includes(searchTag.toLowerCase())
	);

	const selectedLabels = selectedCategories.map(c => c.name).join(", ");
	const selectedTagLabels = selectedTags.map(t => t.name).join(", ");

	const handleSubmit = async () => {
		const newErrors: FormErrors = {};
		if (!title) newErrors.title = "Title is required";
		if (!slug) newErrors.slug = "Slug is required";
		if (!value) newErrors.content = "Content is required";
		if (selectedCategories.length === 0)
			newErrors.categories = "Category is required";
		if (selectedTags.length === 0) newErrors.tags = "Tag is required";
		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) return;

		const data = {
			title,
			slug,
			content: value,
			categories: selectedCategories.map(c => c.id),
			tags: selectedTags.map(t => t.id),
			publishStatus,
		};

		try {
			const result = postId
				? await putData(`/blog/${postId}`, data)
				: await postData(`/blog`, data);
			toast.success(result.message);
			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Card className="max-w-2xl mx-auto p-6">
			<CardHeader>
				<CardTitle className="text-xl font-semibold mb-2">
					{postId ? "Edit Blog Post" : "Create Blog Post"}
				</CardTitle>
				<div className="mt-4">
					<Label htmlFor="status">Status</Label>
					<div className="flex items-center mt-2 gap-2">
						<Switch
							id="status"
							checked={publishStatus}
							onCheckedChange={setpublishStatus}
						/>
						<span className="text-sm text-muted-foreground">
							{publishStatus
								? "Post will be published"
								: "Saved as draft"}
						</span>
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-6">
				<div>
					<Label htmlFor="title">Enter Blog Title</Label>
					<Input
						id="title"
						className="mt-2"
						value={title}
						placeholder="Blog title"
						onChange={e => setTitle(e.target.value)}
					/>
					{errors.title && (
						<p className="text-sm text-red-500 mt-1">
							{errors.title}
						</p>
					)}
				</div>

				<div>
					<Label className="block mb-2">Category</Label>
					<div className="flex flex-col sm:flex-row sm:items-end gap-4">
						<div className="flex-1">
							<Select
								open={open}
								onOpenChange={setOpen}>
								<SelectTrigger className="w-full">
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
											className="mb-3"
										/>
										<div className="space-y-2">
											{filteredCategories.map(
												category => (
													<div
														key={category.id}
														className="flex items-center gap-2 px-3">
														<Checkbox
															id={`cat-${category.id}`}
															checked={selectedCategories.some(
																c =>
																	c.id ===
																	category.id
															)}
															onCheckedChange={() =>
																toggleCategory(
																	category
																)
															}
														/>
														<Label
															htmlFor={`cat-${category.id}`}>
															{category.name}
														</Label>
													</div>
												)
											)}
										</div>
									</div>
								</SelectContent>
							</Select>
						</div>
						<AddCategoryDialog />
					</div>
					{errors.categories && (
						<p className="text-sm text-red-500 mt-1">
							{errors.categories}
						</p>
					)}
				</div>

				<div>
					<Label className="block mb-2">Tags</Label>
					<div className="flex-1">
						<Select
							open={openTag}
							onOpenChange={setOpenTag}>
							<SelectTrigger className="w-full">
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
										className="mb-3"
									/>
									<div className="space-y-2">
										{filteredTags.map(tag => (
											<div
												key={tag.id}
												className="flex items-center gap-2 px-3">
												<Checkbox
													id={`tag-${tag.id}`}
													checked={selectedTags.some(
														t => t.id === tag.id
													)}
													onCheckedChange={() =>
														toggleTag(tag)
													}
												/>
												<Label
													htmlFor={`tag-${tag.id}`}>
													{tag.name}
												</Label>
											</div>
										))}
									</div>
								</div>
							</SelectContent>
						</Select>
					</div>
					{errors.tags && (
						<p className="text-sm text-red-500 mt-1">
							{errors.tags}
						</p>
					)}
				</div>

				<div>
					<Label htmlFor="slug">Enter Description</Label>
					<Textarea
						id="slug"
						rows={4}
						className="mt-2"
						placeholder="Short summary (3-4 lines)"
						value={slug}
						onChange={e => setSlug(e.target.value)}
					/>
					{errors.slug && (
						<p className="text-sm text-red-500 mt-1">
							{errors.slug}
						</p>
					)}
				</div>

				<div>
					<Label htmlFor="content">Content</Label>
					<div className="my-4">
						<ReactQuill
							id="editor"
							theme="snow"
							value={value}
							onChange={setValue}
							className="min-h-[200px]"
						/>
					</div>
					{errors.content && (
						<p className="text-sm text-red-500 mt-1">
							{errors.content}
						</p>
					)}
				</div>
			</CardContent>

			<CardFooter className="justify-end">
				<Button onClick={handleSubmit}>
					{postId ? "Update Blog" : "Create Blog"}
				</Button>
			</CardFooter>
		</Card>
	);
}
