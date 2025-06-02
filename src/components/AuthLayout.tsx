import { Link, Outlet, useLocation } from "react-router";

export default function AuthLayout() {
  const pathname = useLocation().pathname;
  const isLogin = pathname.endsWith("/login");
  const isRegister = pathname.endsWith("/register");
  const isVerify = pathname.endsWith("/verify");

  return (
    <main className="bg-muted h-dvh">
      <header className="flex h-14 items-center px-4">
        <Link to="/" className="text-primary text-2xl font-bold">
          LOGO
        </Link>
      </header>
      <div className="grid place-items-center px-4 py-20">
        <h1 className="text-4xl font-bold">
          {isLogin && "登入"}
          {isRegister && "註冊"}
          {isVerify && "信箱驗證"}
        </h1>
        <p className="mt-2 mb-6">
          {isLogin && "還不是會員嗎？"}
          {isRegister && "已經有會員？"}

          <Link
            to={isLogin ? "/auth/register" : "/auth/login"}
            className="text-secondary hover:text-secondary/80 font-bold"
          >
            {isLogin && "立即註冊"}
            {isRegister && "登入會員"}
          </Link>
        </p>{" "}
        <div className="bg-card text-card-foreground w-full rounded-xl border p-6 shadow sm:w-100">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
