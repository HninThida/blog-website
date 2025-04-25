import { Tags } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ListCardLoading = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{Array(6)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className="p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-900">
						<Skeleton
							height={150}
							className="mb-4 rounded-lg"
						/>
						<Skeleton
							height={20}
							width="80%"
							className="mb-2"
						/>
						<Skeleton
							height={15}
							width="60%"
						/>
					</div>
				))}
		</div>
	);
};
export const DetailPageLoading = () => {
	return (
		<>
			{/* Skeleton Title */}
			<div className="flex justify-between items-start mb-4">
				<div className="flex gap-3 items-center">
					<Skeleton className="h-6 w-64" />
					<Skeleton className="h-6 w-16 rounded-full" />
				</div>
				<Skeleton className="h-10 w-20" />
			</div>

			{/* Author & Date */}
			<div className="flex gap-2 items-center text-sm text-gray-500 mb-5">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-4 w-24" />
			</div>

			{/* Tags */}
			<div className="flex flex-wrap items-center gap-2 mb-5">
				<Tags />
				{[...Array(3)].map((_, i) => (
					<Skeleton
						key={i}
						className="h-6 w-16 rounded-full"
					/>
				))}
			</div>

			{/* Slug + Content */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-5/6" />
				<Skeleton className="h-4 w-2/3" />
				<Skeleton className="h-4 w-1/2" />
			</div>
			<Skeleton
				height={100}
				width="100%"
			/>
		</>
	);
};
