import { Badge } from "@/components/ui/badge";
import { CalendarDays, Tags, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
	{
		id: 1,
		title: "Understanding Gemstone Clarity",
		published: true,
		author: "Hnin Thida",
		date: "Apr 17, 2025",
		content:
			"Gemstone clarity is one of the most important aspects when evaluating a gem’s beauty and value. Inclusions may be visible or invisible to the naked eye, depending on the stone type...",
		tags: ["gemstones", "clarity", "education"],
	},
	{
		id: 1,

		title: "Latest Jewelry Trends in 2025",
		published: false,
		author: "Mr. Spinel",
		date: "Apr 10, 2025",
		content:
			"Jewelry trends in 2025 are moving toward minimalistic yet luxurious designs. From stacked rings to mixed metals, the industry is evolving with sustainable materials and bold creativity...",
		tags: ["jewelry", "trends", "fashion"],
	},
	{
		id: 1,

		title: "Understanding Gemstone Clarity",
		published: true,
		author: "Hnin Thida",
		date: "Apr 17, 2025",
		content:
			"Gemstone clarity is one of the most important aspects when evaluating a gem’s beauty and value. Inclusions may be visible or invisible to the naked eye, depending on the stone type...",
		tags: ["gemstones", "clarity", "education"],
	},
	{
		id: 1,

		title: "Latest Jewelry Trends in 2025",
		published: false,
		author: "Mr. Spinel",
		date: "Apr 10, 2025",
		content:
			"Jewelry trends in 2025 are moving toward minimalistic yet luxurious designs. From stacked rings to mixed metals, the industry is evolving with sustainable materials and bold creativity...",
		tags: ["jewelry", "trends", "fashion"],
	},
];

export default function BlogCardList() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
			{blogPosts.map((post, index) => (
				<div
					key={index}
					className="rounded-xl border p-4 bg-white dark:bg-transparent shadow-sm space-y-4">
					{/* Title & Publish */}
					<div className="flex justify-between items-start">
						<Link to={`/blog/${post.id}`}>
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
								{post.title}
							</h2>
						</Link>
						<Badge
							className="rounded-full"
							variant={post.published ? "default" : "secondary"}>
							{post.published ? "Published" : "Draft"}
						</Badge>
					</div>

					{/* Author & Date */}
					<div className="text-sm flex items-center text-gray-500 gap-2 dark:text-gray-400">
						<UserRound size={14} /> {post.author} &bull;{" "}
						<CalendarDays size={14} /> {post.date}
					</div>

					{/* Blog Content */}
					<p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-5">
						{post.content}
					</p>

					{/* Tags */}
					<div className="flex flex-wrap items-center gap-2">
						<Tags />
						{post.tags.map((tag, i) => (
							<Badge
								key={i}
								variant="secondary"
								className="text-xs rounded-full">
								{tag}
							</Badge>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
