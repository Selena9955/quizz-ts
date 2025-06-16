import { type Option, type QuizTypeValue } from "@/types/quiz.types";
import { GripVertical, X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

type SingleOptItemProps = {
  quizType: QuizTypeValue;
  option: Option;
  handleSelectedAnswer: (id: string) => void;
  handleTextChange: (id: string, text: string) => void;
  handleDelete: (id: string) => void;
  correctAnswerId?: string[];
};

function SingleOptItemEdit({
  quizType,
  option,
  handleSelectedAnswer,
  handleTextChange,
  handleDelete,
  correctAnswerId,
}: SingleOptItemProps) {
  const { id, text } = option;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="flex w-full touch-none items-center gap-2"
    >
      <span {...listeners} className="-mr-2 cursor-pointer text-gray-300">
        <GripVertical />
      </span>
      {quizType == 0 && (
        <RadioGroupItem
          value={id}
          onClick={() => handleSelectedAnswer(id)}
          checked={correctAnswerId?.includes(id) ?? false}
        />
      )}
      {quizType == 1 && (
        <Checkbox
          value={id}
          onClick={() => handleSelectedAnswer(id)}
          defaultChecked={correctAnswerId?.includes(id) ?? false}
        />
      )}
      <input
        className="w-full rounded border px-2 py-1"
        value={text}
        placeholder="請輸入選項"
        onChange={(e) => handleTextChange(id, e.target.value)}
      />
      <Button variant="ghost" size="icon" onClick={() => handleDelete(id)}>
        <X strokeWidth={1} />
      </Button>
    </div>
  );
}

export default SingleOptItemEdit;
