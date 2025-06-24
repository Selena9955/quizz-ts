import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { QuizTypeLabels, type QuizListData } from "@/types/quiz.types";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { tagsRecordSearch } from "@/api/tag.api";

type QuizCardProps = {
  quiz: QuizListData;
  className?: string;
};

function QuizCard({ quiz, className }: QuizCardProps) {
  const { id, quizType, title, authorName, tags, quizStats, avatarUrl } = quiz;
  const location = useLocation();
  const navigate = useNavigate();

  const isFromSearchPage = location.pathname.startsWith("/search");

  function handleClick() {
    if (isFromSearchPage) {
      tagsRecordSearch(tags);
    }

    navigate(`/quizzes/${quiz.id}`);
  }

  const difficultyColor = (rate: number) => {
    if (rate >= 0.8) return "text-green-600";
    if (rate >= 0.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Link
      to={`/quizzes/${id}`}
      onClick={handleClick}
      className={cn("group", className)}
    >
      <div className="flex justify-between space-y-2 bg-white transition">
        <div className="text-muted-foreground mt-1 flex items-center gap-3 text-xs">
          <span className="text-secondary">
            {QuizTypeLabels[quizType] ?? "未知"}
          </span>

          <div className="flex items-center gap-1">
            <Avatar className="h-5 w-5">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <p>{authorName}</p>
          </div>
        </div>
        {/* 難度 / 答對率 */}
        <div
          className={cn(
            "hidden items-center gap-1 text-sm font-medium group-hover:flex",
            difficultyColor(quizStats.correctRate),
          )}
        >
          <span>{Math.round(quizStats.correctRate * 100)}% · </span>
          <span> {quizStats.totalCount} 人</span>
        </div>
      </div>

      <div className="items-center md:flex md:justify-between">
        {/* 標題 */}
        <h3 className="text-foreground group-hover:text-primary text-lg font-semibold break-words">
          {title}
        </h3>

        {/* 標籤 */}
        <div className="mt-2 flex flex-wrap items-center gap-1 md:mt-0 md:min-w-40 md:justify-end">
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
