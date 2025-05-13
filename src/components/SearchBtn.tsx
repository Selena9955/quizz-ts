import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import React, { useEffect, useState } from "react";

function SearchBtn() {
	const [open, setOpen] = useState(false);
	const toggleSearch = () => {
		setOpen((prev) => !prev);
	};
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				toggleSearch();
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [toggleSearch]);

	return (
		<div>
			<Button variant="ghost" className="md:hidden" onClick={toggleSearch}>
				<Search />
			</Button>

			<Button variant="outline" size="sm" className="hidden md:block">
				<div className="text-sm text-muted-foreground hidden md:block" onClick={toggleSearch}>
					搜尋 &nbsp;
					<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
						<span className="text-xs">⌘</span>J
					</kbd>
				</div>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="請輸入搜尋文字" />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>Calendar</CommandItem>
						<CommandItem>Search Emoji</CommandItem>
						<CommandItem>Calculator</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>Profile</CommandItem>
						<CommandItem>Billing</CommandItem>
						<CommandItem>Settings</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</div>
	);
}

export default SearchBtn;
