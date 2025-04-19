import BlogCardList from "@/components/blog-cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogDashboard() {
	return (
		<>
			<div className="mb-5  text-center flex justify-between">
				<h1
					role="title"
					className="text-xl font-bold tracking-tight m-0 p-0">
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
			<div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-3 bg-white dark:bg-transparent rounded-xl ">
				{/* Left Side: Search */}
				<Input
					placeholder="Search items..."
					className="w-full sm:max-w-sm"
				/>

				{/* Right Side: Controls */}
				<div className="flex flex-wrap gap-4 sm:justify-start">
					{/* Filter Button */}
					<div className="flex items-center gap-2">Filter</div>

					{/* Category Select */}
					<Select>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="gem">Gem</SelectItem>
							<SelectItem value="jewelry">Jewelry</SelectItem>
						</SelectContent>
					</Select>

					{/* Status Select */}
					<Select>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="available">Available</SelectItem>
							<SelectItem value="sold">Sold</SelectItem>
							<SelectItem value="reserved">Reserved</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<BlogCardList />
		</>
	);
}
