import type { AdminUserData } from "@/types/admin.types";

const API_BASE = "http://localhost:8081";

export async function dbGetAllUsers(
  keyword: string = "",
  page: number = 0,
  pageSize: number = 20,
): Promise<AdminUserData[] | null> {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      size: pageSize.toString(),
    });

    if (keyword.trim()) {
      query.append("keyword", keyword.trim());
    }

    const res = await fetch(`${API_BASE}/db/users?${query.toString()}`, {
      method: "GET",
      credentials: "include",
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }
    console.log(resData);

    return resData.data as AdminUserData[];
    // return null;
  } catch (err) {
    console.error("dbGetAllUsers", err);
    throw err;
  }
}
