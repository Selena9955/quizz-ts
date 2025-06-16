import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import OptItemEdit from "./OptItemEdit";
import { closestCorners, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  QuizTypeType,
  type Option,
  type QuizTypeValue,
} from "@/types/quiz.types";
import { RadioGroup } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

type OptEditProps = {
  quizType: QuizTypeValue;
  options: Option[];
  onOptionsChange: (options: Option[]) => void;
  onSingleAnswerChange?: (id: string) => void;
  onMultipleAnswerChange?: (ids: string[]) => void;
  singleAnswerId: string | null;
  multipleAnswer: string[] | null;
};

function OptEdit({
  quizType,
  options,
  onOptionsChange,
  onSingleAnswerChange,
  onMultipleAnswerChange,
  singleAnswerId = null,
  multipleAnswer = null,
}: OptEditProps) {
  const [correctAnswerId, setCorrectAnswerId] = useState<string[]>([]);

  // 初始化時根據外部傳入的答案設 correctAnswerId
  useEffect(() => {
    if (quizType === QuizTypeType.Single && singleAnswerId) {
      handleSelectedAnswer(singleAnswerId);
    } else if (quizType === QuizTypeType.Multiple && multipleAnswer) {
      multipleAnswer.forEach((id) => handleSelectedAnswer(id));
    }
  }, [quizType, singleAnswerId, multipleAnswer]);

  // 每次 correctAnswerId 改變時，通知外部
  useEffect(() => {
    if (quizType === QuizTypeType.Single) {
      onSingleAnswerChange?.(correctAnswerId[0] ?? null);
    } else if (quizType === QuizTypeType.Multiple) {
      onMultipleAnswerChange?.(
        correctAnswerId.length > 0 ? correctAnswerId : [],
      );
    }
  }, [correctAnswerId, quizType]);

  function handleTextChange(id: string, newText: string) {
    onOptionsChange(
      options.map((opt) => (opt.id === id ? { ...opt, text: newText } : opt)),
    );
  }

  function handleSelectedAnswer(answerId: string) {
    if (quizType === QuizTypeType.Single) {
      setCorrectAnswerId([answerId]); // 單選：只存一個
    } else if (quizType === QuizTypeType.Multiple) {
      setCorrectAnswerId((prev) => {
        if (prev.includes(answerId)) {
          return prev.filter((id) => id !== answerId);
        } else {
          return [...prev, answerId];
        }
      });
    }
  }

  function handleDelete(id: string) {
    onOptionsChange(options.filter((opt) => opt.id !== id));
    setCorrectAnswerId((prev) => prev.filter((answerId) => answerId !== id));
  }

  function handleAdd() {
    onOptionsChange([...options, { id: uuid(), text: "" }]);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = options.findIndex((opt) => opt.id === active.id);
    const newIndex = options.findIndex((opt) => opt.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      onOptionsChange(arrayMove(options, oldIndex, newIndex));
    }
  }

  return (
    <section>
      <Label className="text-secondary mt-4 mb-2">
        {quizType === 0 && "單選題"}
        {quizType === 1 && "多選題"}
        選項
      </Label>
      <p className="text-muted-foreground">
        請選擇{quizType === 0 ? "一" : "至少一"}
        個選項作為解答，最少需要兩個選項
      </p>

      <RadioGroup defaultValue="" className="my-4">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={options}
            strategy={verticalListSortingStrategy}
          >
            {options.map((opt) => (
              <OptItemEdit
                key={opt.id}
                option={opt}
                quizType={quizType}
                handleSelectedAnswer={handleSelectedAnswer}
                handleTextChange={handleTextChange}
                handleDelete={handleDelete}
                correctAnswerId={correctAnswerId}
              />
            ))}
          </SortableContext>
        </DndContext>
      </RadioGroup>
      <div className="text-center">
        <Button
          className="text-muted-foreground"
          variant="ghost"
          onClick={handleAdd}
        >
          新增選項 +
        </Button>
      </div>
    </section>
  );
}

export default OptEdit;
