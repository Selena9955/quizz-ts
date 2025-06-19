import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getSearchHistory } from "@/api/search.api";

function SearchBtn() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

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

  useEffect(() => {
    if (open) {
      setInputValue("");
      getSearchHistory().then((data) => {
        setSearchHistory(data);
      });
    }
  }, [open]);

  const toggleSearch = () => {
    setOpen((prev) => !prev);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    if (inputValue.trim()) {
      const query = `q=${encodeURIComponent(inputValue)}`;
      setOpen(false);
      navigate(`/search?${query}`);
    }
  }

  function handleHistoryClick(word: string) {
    setInputValue(word);
  }

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
        <CommandInput
          placeholder="請輸入搜尋文字，按 Enter 送出"
          value={inputValue}
          onValueChange={setInputValue}
          onKeyDown={handleKeyDown}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="搜尋紀錄">
            {searchHistory.map((word, index) => (
              <CommandItem
                key={index}
                onSelect={() => handleHistoryClick(word)}
              >
                {word}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export default SearchBtn;
