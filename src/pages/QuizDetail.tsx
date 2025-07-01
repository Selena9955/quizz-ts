import { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import type { TagData } from "@/types/tag.types";
import {
  QuizTypeType,
  type QuizDetailData,
  type QuizListData,
  type QuizRecordStats,
} from "@/types/quiz.types";
import {
  deleteQuizById,
  getQuizById,
  getRecommendByTags,
  recordAnswer,
} from "@/api/quiz.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import OptItem from "@/components/OptItem";
import { Label } from "@/components/ui/label";
import FlashOptItem from "@/components/FlashOptItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function QuizDetail() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [quiz, setQuiz] = useState<QuizDetailData>();
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isOptCorrect, setIsOptCorrect] = useState<boolean | null>(null); // 選擇題用
  const [flashResult, setFlashResult] = useState<boolean | null>(null); // 單字卡用
  const [recordStats, setRecordStats] = useState<QuizRecordStats>({
    totalCount: 0,
    correctCount: 0,
    correctRate: 0,
  });
  const [recommendList, setRecommendList] = useState<QuizListData[]>([]);

  const shouldShowResultBlock =
    quiz?.quizType !== QuizTypeType.Flash
      ? showAnswer && isOptCorrect !== null
      : flashResult !== null;

  useEffect(() => {
    async function fetchData() {
      if (!id) {
        navigate("/404", { replace: true });
        return;
      }
      initState();
      try {
        const resData = await getQuizById(id);

        setQuiz(resData);
        setIsOptCorrect(null);
        setIsAuthor(resData.authorId === user?.id);

        // 相關題目推薦
        if (resData.tags && resData.tags.length > 0) {
          console.log(resData.tags);

          fetchRecommend(resData.tags, resData.id);
        }
      } catch (err: any) {
        if (err.status === 404) {
          toast.error(err.message);
          navigate("/404", { replace: true });
        } else {
          console.error("其他錯誤:", err.message);
        }
      }
    }

    async function fetchRecommend(tags: TagData[], id: number) {
      try {
        const result = await getRecommendByTags(tags, id);
        console.log(result);

        setRecommendList(result);
      } catch (err: any) {
        console.error("推薦失敗", err.message);
      }
    }

    fetchData();
  }, [id]);

  if (!quiz) return <p>載入中...</p>;

  function initState() {
    setQuiz(undefined);
    setSelectedAnswers([]);
    setShowAnswer(false);
    setIsOptCorrect(null);
    setFlashResult(null);
    setRecordStats({
      totalCount: 0,
      correctCount: 0,
      correctRate: 0,
    });
  }

  async function handleDelete(id: number) {
    if (!confirm("確定要刪除這篇嗎？")) return;

    try {
      await deleteQuizById(id);
      navigate("/quizzes");
    } catch (error) {
      alert("刪除失拜，請稍後嘗試");
    }
  }

  function isOptCorrectAnswer(): boolean {
    if (!quiz) return false;

    if (quiz.quizType === QuizTypeType.Single) {
      return (
        selectedAnswers.length === 1 &&
        selectedAnswers[0] === quiz.singleAnswerId
      );
    }

    if (quiz.quizType === QuizTypeType.Multiple) {
      const correctSet = new Set(quiz.multipleAnswerId);
      const selectedSet = new Set(selectedAnswers);

      if (correctSet.size !== selectedSet.size) return false;

      for (const id of selectedSet) {
        if (!correctSet.has(id)) return false;
      }

      return true;
    }

    return false; // flashcard 不記錄正確錯誤
  }

  async function handleFlashResult(userRemembered: boolean) {
    setFlashResult(userRemembered);
    try {
      const resData = await recordAnswer({
        quizId: quiz.id,
        isCorrect: userRemembered,
      });
      setRecordStats({
        totalCount: resData.totalCount,
        correctCount: resData.correctCount,
        correctRate: resData.correctRate,
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function handleShowAnswer() {
    if (quiz?.quizType !== QuizTypeType.Flash && selectedAnswers.length === 0) {
      return;
    }

    if (quiz?.quizType !== QuizTypeType.Flash) {
      const result = isOptCorrectAnswer();
      setIsOptCorrect(result);

      try {
        const resData = await recordAnswer({
          quizId: quiz.id,
          isCorrect: result,
        });

        setRecordStats({
          totalCount: resData.totalCount,
          correctCount: resData.correctCount,
          correctRate: resData.correctRate,
        });
      } catch (err: any) {
        toast.error(err.message);
      }
    }

    setShowAnswer(true);
  }

  return (
    <div className="defaultP container">
      <article className="rounded-md bg-white p-3 md:p-8 lg:mx-20">
        <div className="flex justify-between">
          <div className="text-muted-foreground flex w-full flex-wrap items-center justify-between">
            <Link
              to={`/users/${quiz.authorName}`}
              className="flex items-center gap-2"
            >
              <Avatar className="size-10">
                <AvatarImage src={quiz.authorAvatarUrl} />
                <AvatarFallback>default</AvatarFallback>
              </Avatar>
              <p className="text-lg font-semibold">{quiz.authorName}</p>
            </Link>
            <div className="flex items-center">
              <p>
                {quiz.createTime.slice(0, 10)}
                {quiz.createTime.slice(0, 10) !==
                  quiz.updateTime.slice(0, 10) && (
                  <>（更新：{quiz.updateTime.slice(0, 10)}）</>
                )}
              </p>
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
          </div>
        </div>

        <h1 className="mt-10 mb-3 text-3xl font-bold">{quiz.title}</h1>

        <div
          className="ql-editor [&_img]:mx-auto [&_img]:block"
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
          <FlashOptItem
            flashAnswer={quiz.flashAnswer}
            showAnswer={showAnswer}
          />
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

        {/* 解答補充 */}
        {showAnswer && quiz.answerDetail && (
          <div className="bg-muted mt-10 space-y-2 rounded-sm p-4">
            <Label className="text-secondary">解答補充</Label>
            <p className="whitespace-pre-line">{quiz.answerDetail}</p>
          </div>
        )}

        {/* flash 按鈕確認是否記得 */}
        {quiz.quizType === QuizTypeType.Flash &&
          showAnswer &&
          flashResult === null && (
            <div className="mx-auto mt-10 flex max-w-100 justify-center gap-4">
              <Button
                onClick={() => handleFlashResult(false)}
                className="grow"
                variant="outline"
              >
                我忘了
              </Button>
              <Button onClick={() => handleFlashResult(true)} className="grow">
                我記得
              </Button>
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

      {shouldShowResultBlock && (
        <div className="mt-10 rounded-md bg-white p-3 md:p-8 lg:mx-20">
          <div className="justify-cneter flex flex-col items-center py-3">
            {isOptCorrect || flashResult ? (
              <>
                <DotLottieReact
                  src="https://lottie.host/bea331bf-442c-4015-a59f-ef41876e1f23/Gn0pCujDNP.lottie"
                  autoplay
                  className="w-100"
                />
                <p className="font-bold text-green-700">恭喜你答對了！</p>
              </>
            ) : (
              <>
                <DotLottieReact
                  src="https://lottie.host/5ec5de85-d90e-4c40-a16f-dbfba11705e9/q4rlbW7MBS.lottie"
                  autoplay
                  className="w-82"
                />
                <p className="font-bold text-red-700">很可惜，答錯了</p>
              </>
            )}
            <p className="text-muted-foreground mt-3">
              本題已有 {recordStats.totalCount} 人作答，正確率為{" "}
              {(recordStats.correctRate * 100).toFixed(0)}%
            </p>
          </div>
          <div className="mt-4 border-t pt-4">
            <h3 className="text-secondary text-lg font-semibold">相關題目</h3>
            <ul className="text-muted-foreground mt-3 list-inside list-disc space-y-2 text-sm">
              {recommendList.length > 0 ? (
                recommendList.map((quiz) => (
                  <li className="hover:text-primary flex">
                    <span className="before:mr-2 before:content-['•']" />
                    <Link
                      to={`/quizzes/${quiz.id}`}
                      className="flex w-full flex-wrap justify-between gap-2"
                    >
                      <span className="">{quiz.title}</span>
                      <div className="space-x-2">
                        {quiz.tags.map((tag) => (
                          <Badge size="sm">{tag}</Badge>
                        ))}
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li>沒有相關題目</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizDetail;
