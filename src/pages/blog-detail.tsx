/* eslint-disable react-hooks/exhaustive-deps */
import { DetailPageLoading } from "@/components/Loading";
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
import { getData } from "@/lib/utils";
import { CalendarDays, SquarePen, Tags, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function BlogDetail() {
	const { id } = useParams();
	const [post, setPost] = useState<any>({});
	const [loading, setLoading] = useState(true);
	const handleGetBlogById = async () => {
		const result = await getData(`/blogs/${id}`);
		setPost(result?.data);
	};

	useEffect(() => {
		handleGetBlogById();
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, [id]);

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
						<BreadcrumbPage>{post.title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			{loading ? (
				<DetailPageLoading />
			) : (
				<>
					{post && (
						<div className="mt-5">
							{/* Title & Publish */}
							<div className="flex justify-between items-start">
								<div className="flex gap-3">
									<Link to={`/blog/${post?.id}`}>
										<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
											{post?.title}
										</h1>
									</Link>
									<Badge
										className="rounded-full "
										variant={
											post?.publishStatus
												? "default"
												: "secondary"
										}>
										{post?.publishStatus
											? "Publish"
											: "Draft"}
									</Badge>
								</div>
								<Button
									asChild
									className="btn-primary">
									<Link to={`/blog/edit/${id}`}>
										<SquarePen size={18} />{" "}
										<span className="ms-2">Edit</span>
									</Link>
								</Button>
							</div>

							{/* Author & Date */}
							<div className="text-sm flex items-center text-gray-500 gap-2 dark:text-gray-400 my-5">
								<UserRound size={14} /> {post?.author} &bull;{" "}
								<CalendarDays size={14} /> {post?.created}
							</div>

							{/* Blog Content */}

							{/* Tags */}
							<div className="flex flex-wrap items-center gap-2 mb-5">
								<Tags />
								{post?.tags?.map((tag, i) => (
									<Badge
										key={i}
										variant="secondary"
										className="text-xs rounded-full">
										{tag.name}
									</Badge>
								))}
							</div>

							<p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-5 mb-5">
								{post?.slug}
							</p>

							<div
								className=""
								dangerouslySetInnerHTML={{
									__html: post?.content,
								}}></div>
						</div>
					)}
				</>
			)}
		</>
	);
}
