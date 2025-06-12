import { QuizTypeType, type QuizSubmit } from "@/types/quiz.types";

export function validateQuizData(data: QuizSubmit): string | null {
  const {
    quizType,
    title,
    options,
    singleAnswerId,
    multipleAnswerId,
    flashAnswer,
  } = data;

  if (!title.trim()) return "請填寫標題";
  const hasEmptyOption = options.some((opt) => !opt.text.trim());

  switch (quizType) {
    case QuizTypeType.Single:
      if (options.length < 2) return "單選題至少需要兩個選項";
      if (hasEmptyOption) return "選項文字不得為空";
      if (!singleAnswerId) return "請選擇一個正確答案";
      break;

    case QuizTypeType.Multiple:
      if (options.length < 2) return "多選題至少需要兩個選項";
      if (hasEmptyOption) return "選項文字不得為空";
      if (!multipleAnswerId || multipleAnswerId.length === 0)
        return "請選擇一個或多個正確答案";
      break;

    case QuizTypeType.Flash:
      if (!flashAnswer || isQuillBlank(flashAnswer)) return "請填寫解答";
      break;

    default:
      return "不支援的題型";
  }

  return null; // 驗證通過
}

export function isQuillBlank(html: string): boolean {
  // 移除空白與換行，檢查是否只剩下 <p><br></p> 或空內容
  const cleaned = html.replace(/\s+/g, "").toLowerCase();
  return cleaned === "<p><br></p>" || cleaned === "";
}
