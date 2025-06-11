import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import type { Option } from "@/types/quiz.types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { X } from "lucide-react";

type SingleOptEditProps = {
  onOptionsChange: (options: Option[]) => void;
  onAnswerChange: (answerId: string | null) => void;
};

function SingleOptEdit({
  onOptionsChange,
  onAnswerChange,
}: SingleOptEditProps) {
  const [options, setOptions] = useState<Option[]>([{ id: uuid(), text: "" }]);
  const [correctAnswerId, setCorrectAnswerId] = useState<string | null>(null);

  useEffect(() => {
    onOptionsChange(options);
  }, [options]);

  useEffect(() => {
    onAnswerChange(correctAnswerId);
  }, [correctAnswerId]);

  function handleTextChange(id: string, newText: string) {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, text: newText } : opt)),
    );
  }
  function handleSelectedAnswer(answerId) {
    setCorrectAnswerId(answerId);
  }
  function handleDelete(id: string) {
    setOptions((prev) => prev.filter((opt) => opt.id !== id));
    if (correctAnswerId === id) setCorrectAnswerId(null);
  }
  function handleAdd() {
    setOptions((prev) => [...prev, { id: uuid(), text: "" }]);
  }

  return (
    <section>
      <Label className="text-secondary mt-4 mb-2">單選題 選項</Label>
      <p className="text-muted-foreground"> 請選擇一個選項作為解答</p>
      <RadioGroup defaultValue="comfortable" className="my-4">
        {options.map((opt) => (
          <div key={opt.id} className="flex items-center gap-3">
            <RadioGroupItem
              value={opt.id}
              id={`r-${opt.id}`}
              onClick={() => handleSelectedAnswer(opt.id)}
            />
            <input
              className="w-full rounded border px-2 py-1"
              value={opt.text}
              placeholder="請輸入選項"
              onChange={(e) => handleTextChange(opt.id, e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(opt.id)}
            >
              <X strokeWidth={1} />
            </Button>
          </div>
        ))}
      </RadioGroup>
      <div className="text-center">
        <Button className="text-secondary" variant="ghost" onClick={handleAdd}>
          新增選項 +
        </Button>
      </div>
    </section>
  );
}

export default SingleOptEdit;
