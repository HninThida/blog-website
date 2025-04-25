import { Button } from "@/components/ui/button";
import { take } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	count: number;
}

export default function Pagination({
	currentPage,
	totalPages,
	count,
}: PaginationProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = parseInt(searchParams.get("page") || "1", 10);
	const goToPage = (page: number) => {
		// if (page >= 1 && page <= totalPages) {
		// 	onPageChange(page);
		// }
		setSearchParams({ page: page.toString() });
	};
	console.log(currentPage);

	return (
		<>
			{console.log(count)}
			{count > 0 && count > take && (
				<div className="flex items-center justify-center gap-2 mt-4">
					<Button
						variant="outline"
						size="icon"
						onClick={() => goToPage(currentPage - 1)}
						disabled={currentPage === 1}>
						<ChevronLeft className="w-4 h-4" />
					</Button>

					{Array.from(
						{ length: Math.ceil(count / take) },
						(_, i) => i + 1
					).map(page => (
						<Button
							key={page}
							variant={
								page === currentPage ? "default" : "outline"
							}
							className="w-9 h-9 p-0"
							onClick={() => goToPage(page)}>
							{page}
						</Button>
					))}

					<Button
						variant="outline"
						size="icon"
						onClick={() => goToPage(currentPage + 1)}
						disabled={currentPage === totalPages}>
						<ChevronRight className="w-4 h-4" />
					</Button>
				</div>
			)}
		</>
	);
}
