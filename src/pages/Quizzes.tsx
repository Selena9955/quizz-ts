import { getAllQuizzes } from "@/api/quiz.api";
import QuizCard from "@/components/QuizCard";
import type { QuizListData } from "@/types/quiz.types";
import { useEffect, useState } from "react";

function Quizzes() {
  const [quizzes, setQuizzes] = useState<QuizListData[]>([]);

  useEffect(() => {
    async function fetchGetAll() {
      const resData = await getAllQuizzes();
      console.log(resData);
      setQuizzes(resData.data);
    }
    fetchGetAll();
  }, []);
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
