import type { QuizSubmitData } from "@/types/quiz.types";

const API_BASE = "http://localhost:8081";

export async function createQuiz(payload: QuizSubmitData) {
  try {
    const res = await fetch(`${API_BASE}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.message || "新增失敗");
    }
  } catch (err) {
    console.error("createQuiz error:", err);
  }
}

export async function getAllQuizzes() {
  try {
    const res = await fetch(`${API_BASE}/quizzes`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }
    return resData;
  } catch (err) {
    console.error("getAllQ error:", err);
  }
}
