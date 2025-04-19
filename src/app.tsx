import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./layout";
import BlogDashboard from "./pages/blog-dashboard.tsx";
import { BlogDetail } from "./pages/blog-detail.tsx";
import BlogFormCreate from "./pages/add-blog.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <BlogDashboard />,
			},
			{
				path: "/blog/:id",
				element: <BlogDetail />,
			},
			{
				path: "/blog/new",
				element: <BlogFormCreate />,
			},
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
