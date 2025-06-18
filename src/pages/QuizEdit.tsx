import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { v4 as uuid } from "uuid";
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
import { Textarea } from "@/components/ui/textarea";
import OptEdit from "@/components/OptEdit";
import FlashOptEdit from "@/components/FlashOptEdit";
import { validateQuizData } from "@/utils/validationQuiz";
import { Checkbox } from "@/components/ui/checkbox";
import TagsInput from "@/components/TagsInput";
import { createQuiz, getQuizById, updateQuiz } from "@/api/quiz.api";
import { toast } from "sonner";

const quizTypeOptions: { label: string; value: QuizTypeValue }[] = [
  { label: "單選題", value: QuizTypeType.Single },
  { label: "多選題", value: QuizTypeType.Multiple },
  { label: "單字卡", value: QuizTypeType.Flash },
];

function QuizEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const titleRef = useRef<HTMLDivElement>(null);
  const titleDetailRef = useRef<QuillEditorRef>(null);
  const flashAnswerRef = useRef<QuillEditorRef>(null);
  const [quizType, setQuizType] = useState<QuizTypeValue>(QuizTypeType.Single);
  const [title, setTitle] = useState<string>("");
  const [titleDetail, setTitleDetail] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([{ id: uuid(), text: "" }]);
  const [singleAnswerId, setSingleAnswerId] = useState<string>("");
  const [multipleAnswerId, setMultipleAnswerId] = useState<string[]>([]);
  const [flashAnswer, setFlashAnswer] = useState<string>("");
  const [answerDetail, setAnswerDetail] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [errMsg, setErrMsg] = useState<string>("");
  const [hasMoreAdd, setHasMoreAdd] = useState<boolean>(false);

  const typeButton = quizTypeOptions.find(
    (opt) => opt.value === quizType,
  )?.label;

  useEffect(() => {
    if (id) {
      console.log(id);
      async function fetchData() {
        try {
          const resData = await getQuizById(id);
          const data = resData.data;
          const tagNames: string[] = data.tags.map((tag) => tag.name);
          setTitle(data.title);
          setTitleDetail(data.titleDetail);
          setAnswerDetail(data.answerDetail);
          setTags(tagNames);
          if (data.quizType == QuizTypeType.Single) {
            setOptions(data.options);
            handleSingleAnswerChange(data.singleAnswerId);
            setSingleAnswerId(data.singleAnswerId);
          }
          if (data.quizType == QuizTypeType.Multiple) {
            setOptions(data.options);
            setMultipleAnswerId(data.multipleAnswerId);
          }
          if (data.quizType == QuizTypeType.Flash) {
            setOptions(data.flashAnswer);
          }
        } catch (err: any) {
          toast.error(err.message);
        }
      }
      fetchData();
    } else {
      initStatus();
    }
  }, [id]);

  useEffect(() => {
    if (titleRef.current && titleRef.current.innerText !== title) {
      titleRef.current.innerText = title;
    }
  }, [title]);

  function initStatus() {
    setQuizType(QuizTypeType.Single);
    setTitle("");
    setTitleDetail("");
    setOptions([{ id: uuid(), text: "" }]);
    setSingleAnswerId("");
    setMultipleAnswerId([]);
    setFlashAnswer("");
    setAnswerDetail("");
    setTags([]);
    setErrMsg("");
  }

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

  const handleSingleAnswerChange = useCallback((id: string) => {
    setSingleAnswerId(id);
  }, []);

  const handleMultipleAnswerChange = useCallback((id: string[]) => {
    setMultipleAnswerId(id);
  }, []);

  function handleNewSubmit() {
    const error = validateQuizData({
      quizType,
      title,
      titleDetail,
      options,
      singleAnswerId,
      multipleAnswerId,
      flashAnswer,
      answerDetail,
      tags,
    });

    if (error) {
      setErrMsg(error);
      return;
    }
    const payload = {
      quizType: quizType,
      title: title,
      titleDetail: titleDetail,
      options: options,
      singleAnswerId: singleAnswerId,
      multipleAnswerId: multipleAnswerId,
      flashAnswer: flashAnswer,
      answerDetail: answerDetail,
      tags: tags,
    };
    if (id) {
      console.log(payload);
      updateQuiz(id, payload);
      toast.success("修改成功");
      navigate("/quizzes");
    } else {
      try {
        createQuiz(payload);
        initStatus();
        if (!hasMoreAdd) {
          setQuizType(QuizTypeType.Single);
          navigate("/quizzes");
        }
      } catch (err) {
        alert("新增失敗，請稍後再嘗試");
      }
    }
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
            ref={titleDetailRef}
            value={titleDetail}
            onChange={setTitleDetail}
          />
        </section>

        {quizType === 0 && (
          <OptEdit
            quizType={quizType}
            options={options}
            onOptionsChange={handleOptionsChange}
            onSingleAnswerChange={handleSingleAnswerChange}
            singleAnswerId={singleAnswerId}
            multipleAnswer={null}
          />
        )}
        {quizType === 1 && (
          <OptEdit
            quizType={quizType}
            options={options}
            onOptionsChange={handleOptionsChange}
            onMultipleAnswerChange={handleMultipleAnswerChange}
            singleAnswerId={null}
            multipleAnswer={multipleAnswerId}
          />
        )}
        {quizType === 2 && (
          <FlashOptEdit
            ref={flashAnswerRef}
            value={flashAnswer}
            onChange={setFlashAnswer}
          />
        )}
        <section className="mt-10">
          <Label className="text-secondary mt-4 mb-2">解答補充</Label>
          <Textarea
            value={answerDetail}
            onChange={(e) => setAnswerDetail(e.target.value)}
          />
        </section>
        <section className="mt-10 space-y-3">
          <Label className="text-secondary">標籤分類</Label>
          <TagsInput selectedTags={tags} onChangeSelectedTags={setTags} />
        </section>
      </div>
      <div className="fixed bottom-0 left-1/2 w-full max-w-200 -translate-x-1/2">
        <div className="mx-3 flex items-center justify-between gap-2 rounded-tl-lg rounded-tr-lg bg-white p-3">
          <p className="text-danger font-semibold">*{errMsg}</p>
          {id ? (
            <Button onClick={handleNewSubmit}>保存</Button>
          ) : (
            <div className="flex items-center">
              <Checkbox
                checked={hasMoreAdd}
                onCheckedChange={(checked) => setHasMoreAdd(checked === true)}
              />
              <p className="mr-4 ml-1">繼續新增</p>
              <Button onClick={handleNewSubmit}>新增</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default QuizEdit;
