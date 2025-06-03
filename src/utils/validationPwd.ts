import type { AuthMessage } from "@/types/Auth";
export function validatePwd(
  password: string,
  confirmPassword: string,
  setMsg: React.Dispatch<React.SetStateAction<AuthMessage>>,
): boolean {
  setMsg((prev) => ({
    ...prev,
    password: "",
    secondPassword: "",
  }));

  if (!password.trim()) {
    setMsg((prev) => ({ ...prev, password: "❌ 請輸入密碼" }));
    return false;
  }

  if (!confirmPassword.trim()) {
    setMsg((prev) => ({
      ...prev,
      secondPassword: "❌ 請再次輸入密碼",
    }));
    return false;
  }

  if (password.trim().length < 6) {
    setMsg((prev) => ({
      ...prev,
      password: "❌ 密碼不得小於6位數",
    }));
    return false;
  }

  if (password !== confirmPassword) {
    setMsg((prev) => ({ ...prev, secondPassword: "❌ 兩次密碼不一致" }));
    return false;
  }

  // 通過驗證，清除錯誤訊息
  setMsg((prev) => ({ ...prev, password: "", secondPassword: "" }));
  return true;
}
