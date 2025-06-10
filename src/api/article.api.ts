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
