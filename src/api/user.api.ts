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
