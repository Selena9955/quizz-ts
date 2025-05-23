import { Link, NavLink, useLocation } from "react-router";
import { Divide, Menu } from "lucide-react";
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

const MenuList = [
  { name: "題庫", path: "/problems" },
  { name: "討論區", path: "/articles" },
  { name: "TAGs", path: "/tags" },
];

function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navOpened, setNavOpened] = useState(false);

  useEffect(() => {
    // 每次路由變化就關閉選單
    setNavOpened(false);
  }, [location]);

  return (
    <header className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5">
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur">
        <div className="container flex h-14 items-center justify-between gap-2 md:gap-4">
          <Link to="/" className="text-primary text-2xl font-bold">
            LOGO
          </Link>

          {/* phone */}
          <div className="flex items-center md:hidden">
            <SearchBtn />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setNavOpened(!navOpened)}
            >
              <Menu />
            </Button>
          </div>
          {/* desktop */}
          <div className="hidden items-center gap-5 md:flex">
            <SearchBtn />

            <nav className="flex items-center gap-5">
              {MenuList.map((menuItem, index) => (
                <NavLink
                  to={menuItem.path}
                  key={index}
                  className="font-bold text-gray-600 hover:text-gray-900"
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
                    <DropdownMenuItem>測試1</DropdownMenuItem>
                    <DropdownMenuItem>測試2</DropdownMenuItem>
                    <DropdownMenuItem>測試3</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>設定</DropdownMenuItem>
                    <DropdownMenuItem>登出</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild variant="default">
                <Link to="/login">登入</Link>
              </Button>
            )}
          </div>
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
                <NavLink to="">新增問題</NavLink>
              </Button>

              <Button variant="outline" asChild className="flex-grow">
                <NavLink to="">新增題目</NavLink>
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
                >
                  登出
                </Link>
              </>
            ) : (
              <Link
                to="/login"
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
