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

/**
 * tag 使用統計資料
 * - 參數：不傳入任何參數 => 查詢所有日期範圍，預設 type:ALL
 *   - type: TagUsageType（QUIZ / ARTICLE / SEARCH / ALL）
 *   - startDate: 查詢區間的起始日期 (格式為 yyyy-mm-dd)
 *   - endDate: 查詢區間的結束日期 (格式為 yyyy-mm-dd)
 *   - limit: 最多回傳幾筆結果（依照使用次數排序）
 */
export async function dbGetTagUsage(options?: {
  type?: "QUIZ" | "ARTICLE" | "SEARCH" | "ALL";
  startDate?: string; // 格式必須為 yyyy-MM-dd
  endDate?: string; // 格式必須為 yyyy-MM-dd
  limit?: number;
}) {
  const params = new URLSearchParams();

  if (options?.type) params.append("type", options.type);
  if (options?.startDate) params.append("startDate", options.startDate);
  if (options?.endDate) params.append("endDate", options.endDate);
  if (options?.limit) params.append("limit", options.limit.toString());

  try {
    const res = await fetch(`${API_BASE}/db/tag-usage?${params.toString()}`, {
      method: "GET",
      credentials: "include",
    });

    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }
    console.log(resData);

    return resData;
  } catch (err) {
    console.error("dbGetAllUsers", err);
    throw err;
  }
}
