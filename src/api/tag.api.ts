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
    console.log("getAllTags", err);
    throw err;
  }
}

export async function getHomeHotTags() {
  try {
    const res = await fetch(`${API_BASE}/tags/home-hot`, {
      method: "GET",
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "取得失敗");
    }

    return resData.data;
  } catch (err) {
    console.log("getHomeHotTags", err);
    throw err;
  }
}

export async function updateHomeHotTags(payload: string[]) {
  try {
    const res = await fetch(`${API_BASE}/tags/home-hot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "新增失敗");
    }
    console.log(resData);
  } catch (err) {
    console.error("updateHomeHotTags", err);
    throw err;
  }
}
