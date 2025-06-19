const API_BASE = "http://localhost:8081";

type SearchQuery = {
  q: string;
  type?: number;
  [key: string]: string | number | undefined; // for extensibility
};

export async function search(params: SearchQuery) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.set(key, String(value));
    }
  });

  try {
    const res = await fetch(`${API_BASE}/search?${query.toString()}`, {
      method: "GET",
      credentials: "include",
    });

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
