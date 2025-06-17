import type { ProfileFormData } from "@/types/auth.types";

const API_BASE = "http://localhost:8081";

export async function getUserProfileById(username: string) {
  try {
    const res = await fetch(`${API_BASE}/users/${username}`, {
      method: "GET",
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }

    return resData.data;
  } catch (err) {
    console.log("getProfile -", err);
    throw err;
  }
}
export async function updateProfile(payload: ProfileFormData) {
  const res = await fetch(`${API_BASE}/users/${payload.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const resData = await res.json();

  if (!res.ok) {
    const error = new Error(resData.message || "更新失敗");
    (error as any).status = res.status; // 加上 status 給外層識別
    throw error;
  }

  return resData;
}

export async function getUserArticles(username: string) {
  try {
    const res = await fetch(`${API_BASE}/users/${username}/articles`, {
      method: "GET",
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }

    return resData.data;
  } catch (err) {
    console.log("getUserArticles -", err);
    throw err;
  }
}

export async function getUserQuizzes(username: string) {
  try {
    const res = await fetch(`${API_BASE}/users/${username}/quizzes`, {
      method: "GET",
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }

    return resData.data;
  } catch (err) {
    console.log("getUserQuizzes -", err);
    throw err;
  }
}

export async function toggleFollow(targetUserId: number) {
  const res = await fetch(`${API_BASE}/users/follow/${targetUserId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const resData = await res.json();

  if (!res.ok) {
    const error = new Error(resData.message || "追蹤失敗");
    (error as any).status = res.status;
    throw error;
  }
  console.log(resData);
  return resData.data;
}
