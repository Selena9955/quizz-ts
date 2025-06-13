import { Label } from "./ui/label";
import {
  QuizTypeType,
  type Option,
  type QuizTypeValue,
} from "@/types/quiz.types";
import { Button } from "./ui/button";

type OptItemProps = {
  quizType: QuizTypeValue;
  options: Option[];
  currAnswers?: string[];
  currAnswer?: string;
  selectedAnswers: string[];
  onSelectAnswers: (newSelected: string[]) => void;
  showAnswer: boolean;
};
function OptItem({
  quizType,
  options,
  currAnswer = "",
  currAnswers = [],
  selectedAnswers,
  onSelectAnswers,
  showAnswer,
}: OptItemProps) {
  function handleSelect(id: string) {
    if (quizType === QuizTypeType.Single) {
      // 單選題：只保留一個 id
      console.log("單");

      onSelectAnswers([id]);
    } else {
      // 多選題：toggle
      console.log("多");
      if (selectedAnswers.includes(id)) {
        onSelectAnswers(selectedAnswers.filter((ans) => ans !== id));
      } else {
        onSelectAnswers([...selectedAnswers, id]);
      }
    }
  }
  function getBgColor(id: string) {
    console.log(showAnswer);

    const isCorrect = currAnswers.includes(id) || currAnswer.includes(id);
    const isSelected = selectedAnswers.includes(id);

    if (showAnswer) {
      if (isSelected) {
        return isCorrect ? "bg-primary/40" : "bg-red-100";
      }
    } else {
      if (isSelected) {
        return "bg-gray-200"; // 未公布前顯示灰色
      }
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-secondary justify-center text-lg">
        {quizType === 0 ? "單選題" : "多選題"}
      </Label>
      {options.map((opt) => (
        <div
          key={opt.id}
          className={`${getBgColor(opt.id)} ${
            showAnswer ? "cursor-default" : "hover:bg-muted cursor-pointer"
          } flex items-center space-x-2 rounded-md border px-2 py-3`}
          onClick={() => {
            if (!showAnswer) handleSelect(opt.id);
          }}
        >
          <Label htmlFor={opt.id}>{opt.text}</Label>
        </div>
      ))}
    </div>
  );
}

export default OptItem;
