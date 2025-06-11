import { useCallback, useEffect, useRef, useState } from "react";
import {
  QuizTypeType,
  type Option,
  type QuizTypeValue,
} from "@/types/quiz.types";
import { ChevronDown } from "lucide-react";
import QuillEditor, { type QuillEditorRef } from "@/components/QuillEditor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SingleOptEdit from "@/components/SingleOptEdit";
import MultipleOptEdit from "@/components/MultipleOptEdit";

const quizTypeOptions: { label: string; value: QuizTypeValue }[] = [
  { label: "單選題", value: QuizTypeType.Single },
  { label: "多選題", value: QuizTypeType.Multiple },
  { label: "單字卡", value: QuizTypeType.Flash },
];

function QuizEdit() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleDetailRef = useRef<QuillEditorRef>(null);
  const [quizType, setQuizType] = useState<QuizTypeValue>(QuizTypeType.Single);
  const [title, setTitle] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [singleAnswerId, setSingleAnswerId] = useState<string | null>(null);
  const [titleDetail, setTitleDetail] = useState<string>("");

  const typeButton = quizTypeOptions.find(
    (opt) => opt.value === quizType,
  )?.label;

  useEffect(() => {
    if (titleRef.current && titleRef.current.innerText !== title) {
      titleRef.current.innerText = title;
    }
  }, [title]);

  function handleTypeChange(type: QuizTypeValue) {
    setQuizType(type);
  }

  function handleTitleChange(e: React.FormEvent<HTMLDivElement>) {
    const value = e.currentTarget.innerText;
    setTitle(value);
  }

  const handleOptionsChange = useCallback((options: Option[]) => {
    setOptions(options);
  }, []);

  const handleAnswerChange = useCallback((id: string | null) => {
    setSingleAnswerId(id);
  }, []);

  function handleNewSubmit() {
    const payload = {
      quizType: quizType,
      title: title,
      titleDetail: titleDetail,
      options: options,
      singleAnswerId: singleAnswerId,
    };
    console.log(payload);
  }

  return (
    <>
      <div className="mx-auto mb-16 max-w-200 rounded-lg border bg-white p-4">
        <section className="mb-10">
          <div className="flex flex-col items-end gap-2 md:flex-row-reverse md:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {typeButton}
                  <ChevronDown size={16} strokeWidth={1} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {quizTypeOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleTypeChange(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative w-full">
              <div
                ref={titleRef}
                contentEditable
                className="w-full rounded-md border px-3 py-1"
                onInput={handleTitleChange}
                suppressContentEditableWarning
              />

              {title.trim() === "" && (
                <span className="text-muted-foreground pointer-events-none absolute top-1 left-3">
                  請輸入標題
                </span>
              )}
            </div>
          </div>
          <Label className="text-secondary mt-4 mb-2">題目描述</Label>
          <QuillEditor
            value={titleDetail}
            onChange={setTitleDetail}
            ref={titleDetailRef}
          />
        </section>

        {quizType === 0 && (
          <SingleOptEdit
            onOptionsChange={handleOptionsChange}
            onAnswerChange={handleAnswerChange}
          />
        )}
        {quizType === 1 && <MultipleOptEdit />}
      </div>
      <div className="fixed bottom-0 left-1/2 w-full max-w-200 -translate-x-1/2">
        <div className="mx-3 flex items-center justify-between gap-2 rounded-tl-lg rounded-tr-lg bg-white p-3">
          <p>test</p>
          <Button onClick={handleNewSubmit}>新增</Button>
        </div>
      </div>
    </>
  );
}

export default QuizEdit;
