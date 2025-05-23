import { Link, Outlet, useLocation } from "react-router";

export default function AuthLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <main className="bg-muted h-dvh">
      <header className="flex h-14 items-center px-4">
        <Link to="/" className="text-primary text-2xl font-bold">
          LOGO
        </Link>
      </header>
      <div className="grid place-items-center px-4 py-20">
        <h1 className="text-4xl font-bold">{isLogin ? "登入" : "註冊"}</h1>
        <p className="mt-2 mb-6">
          {isLogin ? "還不是會員嗎？" : "已經有會員？"}

          <Link
            to={isLogin ? "/register" : "/login"}
            className="text-secondary hover:text-secondary/80 font-bold"
          >
            {isLogin ? "立即註冊" : "登入會員"}
          </Link>
        </p>{" "}
        <form className="bg-card text-card-foreground w-full space-y-4 rounded-xl border p-6 shadow sm:w-100">
          <Outlet />
        </form>
      </div>
    </main>
  );
}
