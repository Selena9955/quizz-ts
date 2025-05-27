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
import { useEffect, useState } from "react";

function SearchBtn() {
  const [open, setOpen] = useState(false);

  const toggleSearch = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      {/* phone */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSearch}
      >
        <Search />
      </Button>

      {/* desktop */}
      <Button
        variant="secondary"
        size="sm"
        className="hidden md:block"
        onClick={toggleSearch}
      >
        <div className="text-muted-foreground hidden text-sm md:block">
          搜尋 &nbsp;
          <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            <span className="text-xs">Ctrl</span>
            <span className="text-xs">J</span>
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
