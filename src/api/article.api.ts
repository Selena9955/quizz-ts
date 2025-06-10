import type { CreateArticlePayload } from "@/types/article.types";

const API_BASE = "http://localhost:8081";

export async function createArticle(payload: CreateArticlePayload) {
  try {
    const res = await fetch(`${API_BASE}/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 若需要攜帶 cookie
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.message || "文章新增失敗");
    }
  } catch (err) {
    console.error("createArticle error:", err);
    throw err;
  }
}

export async function getAllArticles() {
  try {
    const res = await fetch(`${API_BASE}/articles`, {
      method: "GET",
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "文章讀取失敗");
    }

    return resData;
  } catch (err) {
    console.error("getAllArticles error:", err);
    throw err;
  }
}
export async function getArticleById(id: string | undefined) {
  try {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
      method: "GET",
    });
    const resData = await res.json();
    if (res.status === 404) {
      const error = new Error("文章不存在");
      (error as any).status = 404;
      throw error;
    }

    if (!res.ok) {
      const error = new Error(resData.message || "文章讀取失敗");
      (error as any).status = res.status;
      throw error;
    }

    return resData;
  } catch (err) {
    console.error("getAllArticles error:", err);
    throw err;
  }
}

export async function deleteArticle(id: string | number) {
  try {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
      method: "DELETE",
      credentials: "include", // 如果需要 cookie 驗證
    });

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.message || "文章刪除失敗");
    }
  } catch (err) {
    console.error("deleteArticle error:", err);
    throw err;
  }
}
export async function updateArticle(
  id: string | number,
  payload: CreateArticlePayload,
) {
  try {
    const res = await fetch(`${API_BASE}/articles/${id}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 若需要攜帶 cookie
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.message || "文章更新失敗");
    }
  } catch (err) {
    console.error("updateArticle error:", err);
    throw err;
  }
}
