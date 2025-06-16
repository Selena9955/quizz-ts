import { getAllQuizzes } from "@/api/quiz.api";
import QuizCard from "@/components/QuizCard";
import type { QuizListData } from "@/types/quiz.types";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

function Quizzes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizListData[]>([]);

  useEffect(() => {
    const shouldRefresh = location.state?.shouldRefresh;
    async function fetchGetAll() {
      const resData = await getAllQuizzes();
      console.log(resData);
      setQuizzes(resData.data);
    }

    if (shouldRefresh) {
      navigate(location.pathname, { replace: true });
      fetchGetAll();
      return;
    }
    fetchGetAll();
  }, [location.key]);
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}

export default Quizzes;
