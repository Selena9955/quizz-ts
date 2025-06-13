import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Quizzes from "./pages/Quizzes.tsx";
import QuizEdit from "./pages/QuizEdit.tsx";
import QuizDetail from "./pages/QuizDetail.tsx";
import Articles from "./pages/Articles.tsx";
import ArticleEditor from "./pages/ArticleEditor.tsx";
import ArticleDetail from "./pages/ArticleDetail.tsx";
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
          { path: "quizzes", Component: Quizzes, children: [] },
          { path: "quizzes/new", Component: QuizEdit },
          { path: "quizzes/:id", Component: QuizDetail },
          {
            path: "articles",
            Component: Articles,
          },
          { path: "articles/new", Component: ArticleEditor },
          { path: "articles/:id/edit", Component: ArticleEditor },
          { path: "articles/:id", Component: ArticleDetail },
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
    <RouterProvider router={router} />
  </AuthProvider>,
);
