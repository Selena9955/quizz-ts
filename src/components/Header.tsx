import { Link, NavLink } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import SearchBtn from "./SearchBtn";
const MenuList = [
	{ name: "題庫", path: "" },
	{ name: "討論區", path: "" },
	{ name: "TAGs", path: "" },
];
function Header() {
	const [navOpened, setNavOpened] = useState(false);
	return (
		<div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5">
			<div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-14 items-center justify-between gap-2 md:gap-4">
					<Link to="/" className="font-bold text-2xl">
						LOGO
					</Link>

					{/* phone */}
					<div className="flex items-center md:hidden">
						<SearchBtn />
						<Button variant="ghost" size="icon" onClick={() => setNavOpened(!navOpened)}>
							<Menu />
						</Button>
					</div>
					{/* desktop */}
					<div className="hidden md:flex gap-5 items-center">
						<SearchBtn />

						<nav className="flex gap-5 items-center ">
							{MenuList.map((menuItem, index) => (
								<NavLink
									to={menuItem.path}
									key={index}
									className="text-gray-600 hover:text-gray-900 font-bold">
									{" "}
									{menuItem.name}
								</NavLink>
							))}
						</nav>
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger>
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
									<AvatarImage src="https://github.com/.png" alt="@shadcn" />
									<AvatarFallback>U</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>測試1</DropdownMenuItem>
								<DropdownMenuItem>測試2</DropdownMenuItem>
								<DropdownMenuItem>測試3</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>

			{navOpened && (
				<div className="bg-background/70 backdrop-blur  h-dvh p-4 md:hidden">
					<div className="flex bg-white rounded-md p-4 items-center gap-4">
						<Avatar>
							<AvatarImage src="https://github.com/.png" alt="@shadcn" />
							<AvatarFallback>U</AvatarFallback>
						</Avatar>
						<p>username</p>
					</div>
					<nav className="grid gap-1 mt-3">
						{MenuList.map((menuItem, index) => (
							<NavLink
								to={menuItem.path}
								key={index}
								className=" text-gray-600 hover:bg-accent font-bold rounded-lg p-2">
								{menuItem.name}
							</NavLink>
						))}
						<hr className="my-2" />
						<NavLink to="" className=" text-gray-600 hover:bg-accent font-bold rounded-lg p-2">
							設定
						</NavLink>
						<NavLink to="" className=" text-gray-600 hover:bg-accent font-bold rounded-lg p-2">
							登出
						</NavLink>
					</nav>
				</div>
			)}
		</div>
	);
}

export default Header;
