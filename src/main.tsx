import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.tsx";
import Problems from "./pages/Problems.tsx";
import Articles from "./pages/Articles.tsx";
import ArticleAdd from "./pages/ArticleAdd.tsx";
import Tags from "./pages/Tags.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import AuthLayout from "./components/AuthLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        Component: Layout,
        children: [
          { index: true, Component: Home },
          { path: "problems", Component: Problems },
          {
            path: "articles",
            Component: Articles,
          },
          { path: "articles/add", Component: ArticleAdd },
          { path: "tags", Component: Tags },
        ],
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
