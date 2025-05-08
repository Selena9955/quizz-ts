import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		Component: Layout,
		children: [{ index: true, Component: Home }],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
