const API_BASE = "http://localhost:8081";

export async function getAllTags() {
  try {
    const res = await fetch(`${API_BASE}/tags`, {
      method: "GET",
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }

    return resData;
  } catch (err) {
    console.log("getUser -", err);
    throw err;
  }
}
