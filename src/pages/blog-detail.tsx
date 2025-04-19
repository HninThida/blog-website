import { Badge } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CalendarDays, SquarePen, Tags, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export function BlogDetail() {
	const { id } = useParams();
	console.log(id);
	const post = {
		id: 1,

		title: "Latest Jewelry Trends in 2025",
		published: false,
		author: "Mr. Spinel",
		date: "Apr 10, 2025",
		content:
			"Jewelry trends in 2025 are moving toward minimalistic yet luxurious designs. From stacked rings to mixed metals, the industry is evolving with sustainable materials and bold creativity...",
		tags: ["jewelry", "trends", "fashion"],
		detailContent: `Gems and jewelry have fascinated humankind for centuries, representing beauty, wealth, and personal expression. Natural gemstones like rubies, emeralds, sapphires, and diamonds are admired not only for their brilliant colors and sparkle but also for their rarity and value. Each stone carries a unique story, often shaped by the geographic region and the forces of nature that created it.

Jewelry is more than just ornamentation; it's a symbol of culture and tradition. In many societies, pieces like necklaces, rings, and bracelets are used in religious ceremonies, marriages, and as heirlooms passed down through generations. From the intricate gold work of Indian artisans to the minimalist elegance of Western design, jewelry reflects the values and aesthetics of its origin.

Modern-day jewelry combines craftsmanship with technology. Jewelers now use advanced techniques like laser cutting, 3D printing, and CAD (computer-aided design) to create precise, detailed designs. Synthetic gemstones and lab-grown diamonds have also gained popularity, offering affordable and ethically sourced alternatives without compromising beauty.

The gemstone industry is also driven by symbolism and belief. Many people wear certain stones for their supposed spiritual or healing properties—such as amethyst for calmness or spinel for energy renewal. Birthstones, zodiac stones, and lucky charms continue to play a major role in personal jewelry choices.

As fashion evolves, so does jewelry design. Today’s jewelry blends tradition with contemporary styles, making it possible to find pieces that are timeless yet trendy. Whether it's a simple pendant for daily wear or a statement ring for a special occasion, gems and jewelry continue to captivate people worldwide, serving as cherished expressions of identity, love, and beauty.

`,
	};

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to={"/"}>Blog Dashboard</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbPage>{id}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="mt-5">
				{/* Title & Publish */}
				<div className="flex justify-between items-start">
					<div className="flex gap-3">
						<Link to={`/blog/${post.id}`}>
							<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
								{post.title}
							</h1>
						</Link>
						<Badge
							className="rounded-full "
							variant={post.published ? "default" : "secondary"}>
							{post.published ? "Published" : "Draft"}
						</Badge>
					</div>
					<Button
						asChild
						className="btn-primary">
						<Link to="/blog/new">
							<SquarePen size={18} />{" "}
							<span className="ms-2">Edit</span>
						</Link>
					</Button>
				</div>

				{/* Author & Date */}
				<div className="text-sm flex items-center text-gray-500 gap-2 dark:text-gray-400 my-5">
					<UserRound size={14} /> {post.author} &bull;{" "}
					<CalendarDays size={14} /> {post.date}
				</div>

				{/* Blog Content */}

				{/* Tags */}
				<div className="flex flex-wrap items-center gap-2 mb-5">
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

				<p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-5 mb-5">
					{post.content}
				</p>

				<pre className="text-base text-gray-700  dark:text-gray-300  font-sans whitespace-pre-line">
					{post.detailContent}
				</pre>
			</div>
		</>
	);
}
