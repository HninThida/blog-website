// import { ModeToggle } from "@/components/mode-toggle";
// import { Button } from "@/components/ui/button";
// import { Outlet, Link } from "react-router-dom";

// export default function Layout() {
// 	// const { pathname } = useLocation();

// 	return (
// 		<div className="container  ">
// 			<nav className="flex justify-between bg-gray-100 p-5 bg-gray-800">
// 				<Link to="/">
// 					BLOG
// 					{/* {pathname === "/" ? <Home /> : <ArrowLeft />} */}
// 				</Link>

// 				<div className="flex gap-2">
// 					<Button
// 						variant="ghost"
// 						asChild>
// 						<Link to="/login">Login</Link>
// 					</Button>
// 					<ModeToggle />
// 				</div>
// 			</nav>
// 			<div className="container">
// 				<Outlet />
// 			</div>
// 		</div>
// 	);
// }

import { ModeToggle } from "@/components/mode-toggle";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
	// const { pathname } = useLocation();

	return (
		<div className="container mx-auto">
			<nav className="flex justify-between items-center  bg-gray-100 p-4 px-8 dark:bg-neutral-800">
				<Link to="/">
					<h1 className="font-semibold text-4xl">BLOG</h1>
					{/* {pathname === "/" ? <Home /> : <ArrowLeft />} */}
				</Link>

				<div className="flex gap-2">
					<ModeToggle />
				</div>
			</nav>
			<div className="container p-8">
				<Outlet />
			</div>
		</div>
	);
}
