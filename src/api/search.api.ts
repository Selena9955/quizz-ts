const API_BASE = "http://localhost:8081";

export async function search(keyword: string) {
  try {
    const res = await fetch(
      `${API_BASE}/search?q=${encodeURIComponent(keyword)}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }
    return resData.data;
  } catch (err) {
    console.log("search -", err);
    throw err;
  }
}

export async function getSearchHistory() {
  try {
    const res = await fetch(`${API_BASE}/search/history`, {
      method: "GET",
      credentials: "include",
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }

    return resData.data;
  } catch (err) {
    console.log("searchHistory -", err);
    throw err;
  }
}
