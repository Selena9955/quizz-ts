import { Link, useNavigate } from "react-router";
import { QuizTypeLabels, type QuizListData } from "@/types/quiz.types";
import { Badge } from "./ui/badge";

type QuizCardProps = {
  quiz: QuizListData;
};

function QuizCard({ quiz }: QuizCardProps) {
  const { id, quizType, title, authorName, tags } = quiz;

  return (
    <div className="block flex-1 rounded-lg border bg-white/80 px-4 py-2 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <p className="text-secondary text-sm font-semibold">
          {QuizTypeLabels[quizType]}
        </p>
        <Link
          to={`/user/${authorName}`}
          className="text-muted-foreground cursor-pointer"
        >
          {authorName}
        </Link>
      </div>
      <Link to={`/quizzes/${id}`}>
        <h3 className="text-xl font-bold">{title}</h3>

        <div className="mt-3 flex gap-1">
          {tags.map((tag, index) => (
            <Badge key={index} size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default QuizCard;
