import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { Menu, EllipsisVertical } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import SearchBtn from "./SearchBtn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/api/auth.api";

const MenuList = [
  { name: "題庫", path: "/quizzes" },
  { name: "討論區", path: "/articles" },
  { name: "TAGs", path: "/tags" },
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { user, setUser } = useAuth();
  const [navOpened, setNavOpened] = useState(false);

  // 判斷是否登入
  const isLoggedIn = user !== null;

  useEffect(() => {
    // 每次路由變化就關閉選單
    setNavOpened(false);
  }, [location]);

  async function handleLogout() {
    try {
      // 呼叫後端登出 API，清除 cookie
      const res = await logout();
      if (res.status === 200) {
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      alert("⚠️ 登出失敗，請稍後再試");
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-49 border-b border-gray-950/5">
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur">
        <div className="container flex h-14 items-center justify-between gap-2 md:gap-4">
          <Link to="/" className="text-primary text-2xl font-bold">
            LOGO
          </Link>

          {isDesktop ? (
            /* desktop */
            <div className="items-center gap-5 md:flex">
              <SearchBtn />

              <nav className="flex items-center gap-5">
                {MenuList.map((menuItem, index) => (
                  <NavLink
                    to={menuItem.path}
                    key={index}
                    className="t ext-gray-600 font-bold hover:text-gray-900"
                    end
                  >
                    {menuItem.name}
                  </NavLink>
                ))}
              </nav>
              {isLoggedIn ? (
                <>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button>新增</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link to="/quizzes/new">新增題目</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/articles/new">新增討論</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link
                    to={`/users/${user.username}`}
                    className="flex items-center gap-2"
                  >
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>err</AvatarFallback>
                    </Avatar>
                    <p>{user.username}</p>
                  </Link>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>設定</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        登出
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                /* phone */
                <Button asChild variant="default">
                  <Link to="/auth/login">登入</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <SearchBtn />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setNavOpened(!navOpened)}
              >
                <Menu />
              </Button>
            </div>
          )}
        </div>
      </div>

      {navOpened && (
        <div className="bg-background/70 h-dvh p-4 backdrop-blur md:hidden">
          {isLoggedIn && (
            <div className="flex items-center gap-4 rounded-md bg-white p-4">
              <Avatar>
                <AvatarImage src="https://github.com/.png" alt="@shadcn" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <p>username</p>
            </div>
          )}

          {isLoggedIn && (
            <div className="my-4 flex gap-2">
              <Button variant="default" asChild className="flex-grow">
                <Link to="/articles/new">新增問題</Link>
              </Button>

              <Button variant="outline" asChild className="flex-grow">
                <Link to="/quizzes/new">新增題目</Link>
              </Button>
            </div>
          )}
          <nav className="grid gap-1">
            {MenuList.map((menuItem, index) => (
              <NavLink
                to={menuItem.path}
                key={index}
                className="hover:bg-accent rounded-lg p-2 font-bold text-gray-600"
              >
                {menuItem.name}
              </NavLink>
            ))}
            <hr className="my-2" />
            {isLoggedIn ? (
              <>
                <NavLink
                  to=""
                  className="hover:bg-accent rounded-lg p-2 font-bold text-gray-600"
                >
                  設定
                </NavLink>
                <Link
                  to=""
                  className="hover:bg-accent rounded-lg p-2 font-bold text-gray-600"
                  onClick={handleLogout}
                >
                  登出
                </Link>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="hover:bg-accent rounded-lg p-2 font-bold text-gray-600"
              >
                登入
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
