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
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Verify from "./pages/Verify.tsx";
import AuthLayout from "./components/AuthLayout.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Profile from "./pages/Profile.tsx";
import SearchResult from "./pages/SearchResult.tsx";
import NotFound404 from "./pages/NotFound404.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import Admin from "./pages/Admin.tsx";
import AdminMember from "./pages/AdminMember.tsx";
import AdminTag from "./pages/AdminTag.tsx";

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
          { path: "quizzes/:id/edit", Component: QuizEdit },
          { path: "quizzes/:id", Component: QuizDetail },
          {
            path: "articles",
            Component: Articles,
          },
          { path: "articles/new", Component: ArticleEditor },
          { path: "articles/:id/edit", Component: ArticleEditor },
          { path: "articles/:id", Component: ArticleDetail },
          { path: "users/:username", Component: Profile },
          { path: "search", Component: SearchResult },

          { path: "*", Component: NotFound404 },
        ],
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
          { path: "verify", Component: Verify },

          { path: "*", Component: NotFound404 },
        ],
      },
      {
        path: "db",
        Component: DashboardLayout,
        children: [
          { index: true, Component: Admin },
          { path: "members", Component: AdminMember },
          { path: "tags", Component: AdminTag },
        ],
      },
    ],
  },
  { path: "*", Component: NotFound404 },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
