import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { QuizTypeLabels, type QuizListData } from "@/types/quiz.types";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type QuizCardProps = {
  quiz: QuizListData;
};

function QuizCard({ quiz }: QuizCardProps) {
  const {
    id,
    quizType,
    title,
    authorName = "未知使用者",
    tags = [],
    createTime = "2025-06-01T12:00:00", // 假資料
    answerRate = 0.62, // 假資料
    avatarUrl = "https://picsum.photos/48", // 假資料
  } = quiz;

  const difficultyColor = (rate: number) => {
    if (rate >= 0.8) return "text-green-600";
    if (rate >= 0.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Link to={`/quizzes/${id}`} className="group space-y-2 px-2 py-3">
      <div className="flex justify-between gap-4 transition">
        <div className="text-muted-foreground mt-1 flex items-center gap-3 text-xs">
          <span className="text-secondary">
            {QuizTypeLabels[quizType] ?? "未知"}
          </span>

          <div className="flex items-center gap-1">
            <Avatar className="h-5 w-5">
              <AvatarImage src={"https://picsum.photos/48"} />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <p>{authorName}</p>
          </div>
        </div>
        {/* 難度 / 答對率 */}
        <div
          className={cn(
            "hidden text-sm font-medium group-hover:block",
            difficultyColor(answerRate),
          )}
        >
          {(answerRate * 100).toFixed(0)}%
        </div>
      </div>
      <div className="flex">
        {/* 標題 */}
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-foreground group-hover:text-primary text-lg font-semibold break-words md:truncate">
            {title}
          </h3>
        </div>

        {/* 桌：標籤 */}
        <div className="hidden flex-wrap justify-end gap-1 md:flex">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-xs">無標籤</span>
          )}
        </div>
      </div>
      {/* 手：標籤 */}
      <div className="flex flex-wrap gap-1 md:hidden">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <Badge key={index} variant="default" size="sm">
              {tag}
            </Badge>
          ))
        ) : (
          <span className="text-muted-foreground text-xs">無標籤</span>
        )}
      </div>
    </Link>
  );
}

export default QuizCard;
