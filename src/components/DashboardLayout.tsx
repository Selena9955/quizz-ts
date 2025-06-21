import { useEffect, useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  ListOrdered,
  LogOut,
  Home,
} from "lucide-react";
import { Link, useLocation, Outlet, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { AdminSidebarItem } from "./AdminSidebarItem";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { Toaster } from "sonner";

const MainMenu = [
  { label: "總覽", path: "/db", icon: LayoutDashboard },
  { label: "會員管理", path: "/db/members", icon: BarChart3 },
  { label: "標籤管理", path: "/db/tags", icon: ShoppingBag },
  // { label: "文章管理", path: "/db/articles", icon: ListOrdered },
];

const Preferences = [
  { label: "回到首頁", path: "/", icon: Home },
  { label: "登出", path: "/auth/logout", icon: LogOut },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loading = useAdminGuard("/db");

  if (loading) return null;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900 text-white transition-transform duration-200 ease-in-out xl:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "xl:static xl:inset-auto xl:translate-x-0",
        )}
      >
        <div className="border-b border-gray-700 p-4 text-xl font-bold">
          Quizz
        </div>
        <div className="mt-4 px-4 text-sm tracking-widest text-gray-400 uppercase">
          資料
        </div>
        <nav className="space-y-2 p-4">
          {MainMenu.map((item) => (
            <AdminSidebarItem
              key={item.path}
              {...item}
              onClick={() => setSidebarOpen(false)}
            />
          ))}
        </nav>
        <hr className="border-gray-700" />
        <div className="mt-4 px-4 text-sm tracking-widest text-gray-400 uppercase">
          其他
        </div>
        <nav className="space-y-2 p-4">
          {Preferences.map((item) => (
            <AdminSidebarItem
              key={item.path}
              {...item}
              onClick={() => setSidebarOpen(false)}
            />
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Area */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b px-4 py-2 shadow-sm xl:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? (
              <X className="text-gray-700" />
            ) : (
              <Menu className="text-gray-700" />
            )}
          </button>
          <h1 className="text-lg font-semibold text-gray-800">後台系統</h1>
          <div />
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="3xl:py-12 3xl:px-20 max-w-dvw p-3 sm:p-8">
            <Outlet />
            <Toaster richColors position="bottom-right" expand={true} />
          </div>
        </main>
      </div>
    </div>
  );
}
