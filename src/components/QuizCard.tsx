import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { QuizTypeLabels, type QuizListData } from "@/types/quiz.types";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type QuizCardProps = {
  quiz: QuizListData;
  className?: string;
};

function QuizCard({ quiz, className }: QuizCardProps) {
  const {
    id,
    quizType,
    title,
    authorName,
    tags,
    createTime,
    answerRate,
    avatarUrl,
  } = {
    id: 0,
    quizType: 0,
    title: "模板標題",
    authorName: "未知使用者",
    tags: [],
    createTime: "2025-06-01T12:00:00",
    answerRate: 0.62,
    avatarUrl: "https://picsum.photos/48",
    ...quiz, // quiz 中有的會覆蓋上面預設值
  };

  const difficultyColor = (rate: number) => {
    if (rate >= 0.8) return "text-green-600";
    if (rate >= 0.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Link to={`/quizzes/${id}`} className={cn("group", className)}>
      <div className="flex justify-between space-y-2 transition">
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

      <div className="items-center md:flex md:justify-between">
        {/* 標題 */}
        <h3 className="text-foreground group-hover:text-primary text-lg font-semibold break-words md:truncate">
          {title}
        </h3>

        {/* 桌：標籤 */}
        <div className="mt-2 flex flex-wrap items-center gap-1 md:mt-0">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <Badge key={index} size="sm">
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-xs">無標籤</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default QuizCard;
