import { useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import type { TagData } from "@/types/tag.types";
import { getAllTags } from "@/api/tag.api";
import { Badge } from "./ui/badge";

// 定義 Props
type TagsInputProps = {
  selectedTags: string[];
  onChangeSelectedTags: (tags: string[]) => void;
  buttonLabel?: string;
};

function TagsInput({
  selectedTags,
  onChangeSelectedTags,
  buttonLabel = "管理標籤 +",
}: TagsInputProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [allTag, setAllTags] = useState<TagData[]>([]);

  async function handleOpenTagDialog() {
    setOpen((prev) => !prev);
    const data = await getAllTags();
    setAllTags(data.data);
  }

  function handleAddSelectedTag(tagName: string) {
    if (!selectedTags.includes(tagName)) {
      const newTags = [...selectedTags, tagName];
      console.log(newTags);
      onChangeSelectedTags(newTags);
    }
  }
  function handleRemoveSelectedTag(tagName: string) {
    if (selectedTags.includes(tagName)) {
      const newTags = selectedTags.filter((tag) => tag !== tagName);
      onChangeSelectedTags(newTags);
    }
  }
  function handleSearchEnter() {
    const trimmed = searchValue.trim();
    if (!trimmed) return;

    const alreadySelected = selectedTags.includes(trimmed);
    if (alreadySelected) return;

    const newTags = [...selectedTags, trimmed];
    onChangeSelectedTags(newTags);
    setSearchValue(""); // 清空輸入
  }
  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {selectedTags &&
          selectedTags.map((tag, index) => <Badge key={index}>{tag}</Badge>)}
        <Button variant="outline" onClick={handleOpenTagDialog}>
          {buttonLabel || "管理標籤 +"}
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="請輸入標籤名稱"
          value={searchValue}
          onValueChange={setSearchValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // 避免預設選取事件
              handleSearchEnter();
            }
          }}
        />
        <div className="px-4 py-2">
          <div className="text-muted-foreground mb-2 text-xs">已選擇</div>
          {selectedTags &&
            selectedTags.map((tag, index) => (
              <Badge
                key={index}
                className="mr-1 mb-2 cursor-pointer"
                onClick={() => handleRemoveSelectedTag(tag)}
              >
                {tag} X
              </Badge>
            ))}
        </div>
        <CommandSeparator></CommandSeparator>
        <CommandList>
          <CommandGroup heading="請選擇標籤">
            {allTag &&
              allTag
                .filter((tag) => !selectedTags.includes(tag.name))
                .map((tag, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => handleAddSelectedTag(tag.name)}
                  >
                    {tag.name}
                  </CommandItem>
                ))}
          </CommandGroup>
          <CommandEmpty>無更多標籤，請使用 Enter 自行添加</CommandEmpty>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export default TagsInput;
