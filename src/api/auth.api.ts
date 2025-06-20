import type { LoginFormData, registerFormData } from "@/types/auth.types";

const API_BASE = "http://localhost:8081";

export async function checkEmailRegistered(email: string) {
  try {
    const res = await fetch(`${API_BASE}/auth/check-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      throw new Error("信箱查詢失敗");
    }
    return await res.json();
  } catch (err) {
    console.error("checkEmail error:", err);
    throw err;
  }
}

export async function checkUsernameRegistered(
  username: string,
  signal?: AbortSignal,
) {
  try {
    const res = await fetch(
      `${API_BASE}/auth/check-username?username=${encodeURIComponent(username)}`,
      {
        signal,
      },
    );

    if (!res.ok) {
      throw new Error("用戶名查詢失敗");
    }

    return await res.json();
  } catch (err) {
    console.error("checkUsername error:", err);
    throw err;
  }
}
export async function register(form: registerFormData) {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "註冊失敗");
    }

    return resData;
  } catch (err) {
    console.error("register error:", err);
    throw err;
  }
}
export async function login(form: LoginFormData) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "登入失敗");
    }

    return resData;
  } catch (err) {
    console.error("register error:", err);
    throw err;
  }
}
export async function logout() {
  try {
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "登入失敗");
    }
    return resData;
  } catch (err) {
    console.error("logout error:", err);
  }
}
export async function sendVerifyCode(email: string) {
  try {
    const res = await fetch(`${API_BASE}/auth/send-verify-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "寄信箱驗證碼失敗");
    }
    return resData;
  } catch (err) {
    console.error("sendVerifyCode error:", err);
    throw err;
  }
}
export async function checkVerifyCode(email: string, code: string) {
  try {
    const res = await fetch(`${API_BASE}/auth/check-verify-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "驗證碼發送失敗");
    }
    return resData;
  } catch (err) {
    console.error("checkVerifyCode error:", err);
    throw err;
  }
}
export async function fetchCurrentUser() {
  try {
    const res = await fetch(`${API_BASE}/auth/user`, {
      method: "GET",
      credentials: "include",
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.message || "未登入");
    }

    return resData;
  } catch (err) {
    console.log("getUser -", err);
    throw err;
  }
}
