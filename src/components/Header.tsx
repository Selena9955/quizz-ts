import { Link, NavLink } from "react-router";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
const MenuList = [
	{ name: "題庫", path: "" },
	{ name: "討論區", path: "" },
	{ name: "TAGs", path: "" },
];
function Header() {
	return (
		<div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5">
			<div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-14 items-center justify-between gap-2 md:gap-4">
					<Link to="/" className="font-bold text-2xl">
						LOGO
					</Link>
					<div className="flex gap-8 items-center">
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
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button>新增</Button>
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
		</div>
	);
}

export default Header;
