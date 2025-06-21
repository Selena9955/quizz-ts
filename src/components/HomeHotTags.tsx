import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAllTags, getHomeHotTags, updateHomeHotTags } from "@/api/tag.api";
import type { TagData } from "@/types/tag.types";
import DraggableTag from "./DraggableTag";
import { closestCorners, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "sonner";

function HomeHotTags() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [initialTags, setInitialTags] = useState<TagData[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const [allTags, setAllTags] = useState<TagData[]>([]);
  const [input, setInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const max = 10;

  useEffect(() => {
    async function fetchHotTags() {
      try {
        const data: TagData[] = await getHomeHotTags();
        setSelectedTags(data);
        setInitialTags(data);
      } catch (err: any) {
        toast.error(err.message);
      }
    }
    fetchHotTags();
  }, []);

  async function handleOpenTagDialog() {
    setOpen((prev) => !prev);

    const res = await getAllTags();
    const data = res.data;
    const filter = data.filter(
      (item) => !selectedTags.some((t) => t.name === item.name),
    );

    setAllTags(filter);
  }

  function handleAddTag(tagName: string) {
    const trimmed = tagName.trim();
    if (!trimmed || selectedTags.some((t) => t.name === trimmed)) return;

    const found = allTags.find((t) => t.name === trimmed);
    if (!found) return;

    if (selectedTags.length < max) {
      setSelectedTags((prev) => [...prev, found]);
      setAllTags((prev) => prev.filter((tag) => tag.name !== trimmed));
    }

    setInput("");
  }

  function handleRemoveTag(tagName: string) {
    const removed = selectedTags.find((tag) => tag.name === tagName);
    if (!removed) return;

    setSelectedTags((prev) => prev.filter((tag) => tag.name !== tagName));
    setAllTags((prev) => [...prev, removed]); // 選單補回
  }

  function cancelEdit() {
    setSelectedTags(initialTags);
    setIsEditing(false);
  }

  async function save() {
    try {
      const payload = selectedTags.map((tag) => tag.name);
      await updateHomeHotTags(payload);
      toast.success("儲存成功");
      setInitialTags(selectedTags);
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = selectedTags.findIndex((t) => t.name === active.id);
    const newIndex = selectedTags.findIndex((t) => t.name === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      setSelectedTags(arrayMove(selectedTags, oldIndex, newIndex));
    }
  }

  return (
    <>
      <section className="rounded-xl bg-white p-5 shadow-md">
        {/* 標題 */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-2xl font-semibold">🔥 首頁熱門標籤管理</div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>管理</Button>
          )}
        </div>
        <div className="text-muted-foreground mt-3">
          最多可選擇 10
          個標籤，將其顯示為首頁上的「熱門標籤」。點擊即可新增或刪除標籤。
        </div>

        {/* 標籤 */}
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={selectedTags.map((tag) => tag.name)}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-8 grid grid-cols-2 gap-3 gap-y-5 lg:grid-cols-4 2xl:grid-cols-5">
              {selectedTags &&
                selectedTags.map((tag) => (
                  <DraggableTag
                    key={tag.id}
                    tag={tag.name}
                    isEditing={isEditing}
                    handleRemoveTag={handleRemoveTag}
                  />
                ))}

              {Array.from({ length: max - selectedTags.length }).map(
                (_, index) => (
                  <button
                    key={index}
                    className="border-secondary/50 text-muted-foreground cursor-pointer rounded-md border-2 border-dashed p-2"
                    onClick={isEditing ? handleOpenTagDialog : undefined}
                  >
                    {isEditing ? "點擊增加" : "空"}
                  </button>
                ),
              )}
            </div>{" "}
          </SortableContext>
        </DndContext>

        {isEditing && (
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="secondary" onClick={cancelEdit}>
              取消
            </Button>
            <Button onClick={save}>保存編輯</Button>
          </div>
        )}
      </section>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="請輸入搜尋文字，按 Enter 送出"
          value={input}
          onValueChange={setInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // 避免預設選取事件
              handleAddTag(input);
            }
          }}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="搜尋紀錄">
            {allTags.map((tag) => (
              <CommandItem
                key={tag.id}
                onSelect={() => handleAddTag(tag.name)}
                className="cursor-pointer"
              >
                {tag.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default HomeHotTags;
