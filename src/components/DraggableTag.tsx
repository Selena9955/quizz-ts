import { X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type DraggableTagProps = {
  tag: string;
  isEditing: boolean;
  handleRemoveTag: (tag: string) => void;
};

function DraggableTag({ tag, isEditing, handleRemoveTag }: DraggableTagProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: tag,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isEditing ? "grab" : "default",
  };

  return (
    <div ref={setNodeRef} style={style} className="relative w-full">
      <div
        className="group hover:bg-secondary/60 w-full rounded-sm bg-gray-200 p-2"
        {...(isEditing ? listeners : {})}
        {...(isEditing ? attributes : {})}
        style={{ cursor: isEditing ? "grab" : "default" }}
      >
        {tag}
      </div>
      {isEditing && (
        <div
          className="absolute -top-3 -right-2 grid size-8 cursor-pointer place-content-center rounded-full border bg-white shadow group-hover:inline-block"
          onClick={() => handleRemoveTag(tag)}
        >
          <X />
        </div>
      )}
    </div>
  );
}

export default DraggableTag;
