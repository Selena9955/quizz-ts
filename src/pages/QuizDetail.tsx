import React, { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteQuizById, getQuizById } from "@/api/quiz.api";
import { QuizTypeType, type QuizDetailData } from "@/types/quiz.types";
import { useAuth } from "@/context/AuthContext";
import OptItem from "@/components/OptItem";
import { Label } from "@/components/ui/label";
import FlashOptItem from "@/components/FlashOptItem";

function QuizDetail() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [quiz, setQuiz] = useState<QuizDetailData>();
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (!id) {
        navigate("/404", { replace: true });
        return;
      }
      try {
        const resData = await getQuizById(id);

        setQuiz(resData.data);
        setIsAuthor(resData.data.authorId === user?.id);
      } catch (err: any) {
        if (err.status === 404) {
          navigate("/404", { replace: true });
        } else {
          console.error("API 其他錯誤:", err);
        }
      }
    }
    fetchData();
  }, []);

  if (!quiz) return <p>載入中...</p>;

  async function handleDelete(id: number) {
    if (!confirm("確定要刪除這篇嗎？")) return;

    try {
      await deleteQuizById(id);
    } catch (error) {
      alert("刪除失拜，請稍後嘗試");
    }
  }

  function handleShowAnswer() {
    if (quiz?.quizType !== QuizTypeType.Flash && selectedAnswers.length === 0) {
      return;
    }
    setShowAnswer(true);
  }

  return (
    <article className="rounded-md bg-white p-3 md:p-8 lg:mx-20">
      <div className="flex justify-between">
        <div className="text-muted-foreground flex flex-wrap items-center gap-2">
          <div>{quiz.authorName}</div>
          <p className="text-xs">
            {quiz.createTime.slice(0, 10)}
            {quiz.createTime.slice(0, 10) !== quiz.updateTime.slice(0, 10) && (
              <>（更新：{quiz.updateTime.slice(0, 10)}）</>
            )}
          </p>
        </div>
        {isAuthor && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to={`/quizzes/${quiz.id}/edit`}>修改</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(quiz.id)}>
                刪除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <h1 className="my-3 text-3xl font-bold">{quiz.title}</h1>

      <div
        className="[&_img]:mx-auto [&_img]:block"
        dangerouslySetInnerHTML={{ __html: quiz.titleDetail }}
      />
      <hr className="my-6" />

      {quiz.quizType === QuizTypeType.Single && (
        <OptItem
          quizType={quiz.quizType}
          options={quiz.options}
          currAnswer={quiz.singleAnswerId}
          selectedAnswers={selectedAnswers}
          onSelectAnswers={setSelectedAnswers}
          showAnswer={showAnswer}
        />
      )}
      {quiz.quizType === QuizTypeType.Multiple && (
        <OptItem
          quizType={quiz.quizType}
          options={quiz.options}
          currAnswers={quiz.multipleAnswerId}
          selectedAnswers={selectedAnswers}
          onSelectAnswers={setSelectedAnswers}
          showAnswer={showAnswer}
        />
      )}
      {quiz.quizType === QuizTypeType.Flash && (
        <FlashOptItem flashAnswer={quiz.flashAnswer} showAnswer={showAnswer} />
      )}

      {!showAnswer && (
        <div className="mt-8 text-center">
          <Button
            className="w-full md:max-w-100"
            variant="outline"
            onClick={handleShowAnswer}
          >
            查看解答
          </Button>
        </div>
      )}

      {showAnswer && quiz.answerDetail && (
        <div className="bg-muted mt-10 space-y-2 rounded-sm p-4">
          <Label className="text-secondary">解答補充</Label>
          <p>{quiz.answerDetail}</p>
        </div>
      )}
      <div className="mt-10 flex gap-2">
        <Label className="text-muted-foreground">標籤</Label>
        {quiz?.tags.map((tag) => (
          <Badge key={tag.id} variant="secondary" size="sm">
            {tag.name}
          </Badge>
        ))}
      </div>
    </article>
  );
}

export default QuizDetail;
