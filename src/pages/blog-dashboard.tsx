import BlogCardList from "@/components/blog-cards";
import Pagination from "@/components/custom-pagination";
import { ListCardLoading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getData, take } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function BlogDashboard() {
	const [data, setData] = useState([]);
	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const page = parseInt(searchParams.get("page") || "1", 10);
	const skip = (page - 1) * take;
	const [category, setCategory] = useState("");
	const [tag, setTag] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const handleGetCategories = async () => {
		const res = await getData(`/categories`);
		setCategories(res.data);
	};
	const handleGetTags = async () => {
		const res = await getData(`/tags`);
		setTags(res.data);
	};

	const fetchBlogs = async ({
		searchVal,
		categoryVal,
		tagVal,
	}: {
		searchVal?: string;
		categoryVal?: string;
		tagVal?: string;
	} = {}) => {
		console.log("Called");

		setLoading(true);
		try {
			const params = new URLSearchParams();
			if (searchVal ?? search)
				params.append("search", searchVal ?? search);
			if (
				(categoryVal ?? category) &&
				(categoryVal ?? category) !== "all"
			)
				params.append("category", categoryVal ?? category);
			if ((tagVal ?? tag) && (tagVal ?? tag) !== "all")
				params.append("tag", tagVal ?? tag);

			const res = await getData(
				`/blogs/${skip}/${take}/?${params.toString()}`
			);
			setData(res);
		} catch (err) {
			console.error(err);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 1000); // delay
		}
	};

	useEffect(() => {
		setCurrentPage(page);
		handleGetCategories();
		fetchBlogs();
		handleGetTags(); // initial fetch
	}, [page]);

	// Real-time search
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setSearch(val);
		fetchBlogs({ searchVal: val });
	};

	// On category select
	const handleCategoryChange = (val: string) => {
		setCategory(val);
		fetchBlogs({ categoryVal: val });
	};

	// On tag select
	const handleTagChange = (val: string) => {
		setTag(val);
		fetchBlogs({ tagVal: val });
	};
	return (
		<>
			<div className="mb-5 flex justify-between items-center">
				<h1 className="text-xl font-bold tracking-tight">
					Blog Dashboard
				</h1>
				<Button
					asChild
					className="btn-primary">
					<Link to="/blog/new">
						<CirclePlus size={18} />{" "}
						<span className="ms-2">New Blog</span>
					</Link>
				</Button>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-3 bg-white dark:bg-transparent rounded-xl">
				{/* Search Input */}
				<Input
					placeholder="Search blogs..."
					className="w-full sm:max-w-sm"
					value={search}
					onChange={handleSearchChange}
				/>

				{/* Filters */}
				<div className="flex flex-wrap gap-4 sm:justify-start items-center">
					<span className="font-medium">Filter</span>

					{/* Category Filter */}
					<Select
						value={category}
						onValueChange={handleCategoryChange}>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							{categories.map((item: any, i: number) => (
								<SelectItem
									value={item.name}
									key={i}>
									{item.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Tag Filter - Static for now */}
					<Select
						value={tag}
						onValueChange={handleTagChange}>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Tag" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							{tags.map((item: any, i: number) => (
								<SelectItem
									value={item.name}
									key={i}>
									{item.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			{loading ? (
				<ListCardLoading />
			) : (
				<>
					{/* Blog List */}
					<BlogCardList blogPosts={data?.data} />
					<Pagination
						count={data?.count}
						currentPage={currentPage}
					/>
				</>
			)}
		</>
	);
}
