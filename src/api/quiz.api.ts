import type { FilterType, QuizSubmitData } from "@/types/quiz.types";
import type { TagData } from "@/types/tag.types";

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

export async function getAllQuizzes(
  filterType: FilterType = "ALL",
  page: number = 1,
  pageSize: number = 10,
) {
  try {
    const res = await fetch(
      `${API_BASE}/quizzes?type=${filterType}&page=${page}&size=${pageSize}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }
    return resData.data;
  } catch (err) {
    console.error("getAllQ error:", err);
  }
}

export async function getQuizById(id: string | undefined) {
  const res = await fetch(`${API_BASE}/quizzes/${id}`, {
    method: "GET",
  });
  const resData = await res.json();

  if (!res.ok) {
    const error = new Error(resData.message || "取得失敗");
    (error as any).status = res.status; // ✅ 加入 status 回傳
    throw error;
  }

  return resData.data;
}

export async function deleteQuizById(id: number) {
  console.log(id);

  try {
    const res = await fetch(`${API_BASE}/quizzes/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "刪除失敗");
    }
  } catch (err) {
    console.error("deleteQuiz error:", err);
  }
}

export async function updateQuiz(id: string, payload: QuizSubmitData) {
  try {
    const res = await fetch(`${API_BASE}/quizzes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.message || "修改失敗");
    }
  } catch (err) {
    console.error("createQuiz error:", err);
  }
}

export async function recordAnswer(payload: {
  quizId: number;
  isCorrect: boolean;
}) {
  console.log(payload);

  const res = await fetch(`${API_BASE}/quizzes/records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.message || "記錄失敗");

  return resData.data;
}

export async function getLatestQuizzes() {
  const res = await fetch(`${API_BASE}/quizzes/latest`, {
    method: "GET",
  });
  const resData = await res.json();

  if (!res.ok) {
    const error = new Error(resData.message || "取得失敗");
    (error as any).status = res.status; // 加入 status 回傳
    throw error;
  }

  return resData.data;
}

export async function getUserRecord() {
  try {
    const res = await fetch(`${API_BASE}/quizzes/UserRecord`, {
      method: "GET",
      credentials: "include",
    });
    const resData = await res.json();

    if (!res.ok) throw new Error(resData.message || "取得記錄失敗");

    return resData.data;
  } catch (err: any) {
    console.error(err.message);
  }
}

export async function getRecommendByTags(tags: TagData[], id?: number) {
  const payload = {
    tags: tags,
    excludeId: id ?? null,
  };

  const res = await fetch(`${API_BASE}/quizzes/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "取得推薦失敗");
  return data.data;
}
