import type { AdminUserData } from "@/types/admin.types";

const API_BASE = "http://localhost:8081";

export async function dbGetAllUsers(): Promise<AdminUserData[] | null> {
  try {
    const res = await fetch(`${API_BASE}/db/users`, {
      method: "GET",
      credentials: "include",
    });

    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }

    return resData.data as AdminUserData[];
  } catch (err) {
    console.error("dbGetAllUsers", err);
    throw err;
  }
}

export async function dbChangeRoleByIds(
  ids: number[],
  role: string,
): Promise<AdminUserData[] | null> {
  const res = await fetch(`${API_BASE}/db/users/role`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ ids, role }),
  });

  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || "失敗");
  }

  return resData.data;
}

export async function dbGetTagTsage() {
  try {
    const res = await fetch(`${API_BASE}/db/tag-usage?type=QUIZ`, {
      method: "GET",
      credentials: "include",
    });

    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }

    return resData;
  } catch (err) {
    console.error("dbGetAllUsers", err);
    throw err;
  }
}
