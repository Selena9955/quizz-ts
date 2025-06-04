import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Problems from "./pages/Problems.tsx";
import ProblemNew from "./pages/ProblemNew.tsx";
import Articles from "./pages/Articles.tsx";
import ArticleNew from "./pages/ArticleNew.tsx";
import Tags from "./pages/Tags.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Verify from "./pages/Verify.tsx";
import AuthLayout from "./components/AuthLayout.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        Component: Layout,
        children: [
          { index: true, Component: Home },
          { path: "problems", Component: Problems, children: [] },
          { path: "problems/new", Component: ProblemNew },
          {
            path: "articles",
            Component: Articles,
          },
          { path: "articles/new", Component: ArticleNew },
          { path: "tags", Component: Tags },
        ],
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
          { path: "verify", Component: Verify },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />,
  </AuthProvider>,
);
